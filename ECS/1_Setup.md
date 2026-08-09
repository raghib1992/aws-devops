export AWS_PROFILE="uzrag"             # Your AWS CLI profile
export AWS_REGION="us-east-1"
export VPC_ID="vpc-0dc7bb25e9a365dcc"         # Your VPC ID
export SUBNET_A="subnet-019ed590ef58c39e9"    # Private Subnet 1
export SUBNET_B="subnet-0852e09e3348df9b0"    # Private Subnet 2
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)


# Security Group for ECS Tasks
export ECS_SG_ID=$(aws ec2 create-security-group \
  --group-name ecs-task-sg \
  --description "Security group for private ECS tasks" \
  --vpc-id $VPC_ID \
  --query 'GroupId' --output text)

# Security Group for VPC Endpoints
export VPCE_SG_ID=$(aws ec2 create-security-group \
  --group-name vpc-endpoint-sg \
  --description "Security group for interface VPC Endpoints" \
  --vpc-id $VPC_ID \
  --query 'GroupId' --output text)

# Allow HTTPS (443) traffic from ECS Task SG to VPC Endpoint SG
aws ec2 authorize-security-group-ingress \
  --group-id $VPCE_SG_ID \
  --protocol tcp --port 443 \
  --source-group $ECS_SG_ID



# Create SSM Endpoint
aws ec2 create-vpc-endpoint \
  --vpc-id $VPC_ID \
  --vpc-endpoint-type Interface \
  --service-name com.amazonaws.$AWS_REGION.ssm \
  --subnet-ids $SUBNET_A $SUBNET_B \
  --security-group-ids $VPCE_SG_ID \
  --private-dns-enabled

# Create Secrets Manager Endpoint
aws ec2 create-vpc-endpoint \
  --vpc-id $VPC_ID \
  --vpc-endpoint-type Interface \
  --service-name com.amazonaws.$AWS_REGION.secretsmanager \
  --subnet-ids $SUBNET_A $SUBNET_B \
  --security-group-ids $VPCE_SG_ID \
  --private-dns-enabled

# Create ECR Endpoints (Required to pull container images privately)
aws ec2 create-vpc-endpoint --vpc-id $VPC_ID --vpc-endpoint-type Interface --service-name com.amazonaws.$AWS_REGION.ecr.api --subnet-ids $SUBNET_A $SUBNET_B --security-group-ids $VPCE_SG_ID --private-dns-enabled
aws ec2 create-vpc-endpoint --vpc-id $VPC_ID --vpc-endpoint-type Interface --service-name com.amazonaws.$AWS_REGION.ecr.dkr --subnet-ids $SUBNET_A $SUBNET_B --security-group-ids $VPCE_SG_ID --private-dns-enabled
aws ec2 create-vpc-endpoint --vpc-id $VPC_ID --vpc-endpoint-type Gateway --service-name com.amazonaws.$AWS_REGION.s3 --route-table-ids rtb-0378c3111a5a840a1 rtb-0018557c9ea10cb33


# 1. Create Trust Policy
cat <<EOT > ecs-trust-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ecs-tasks.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOT

# 2. Create IAM Role
aws iam create-role \
  --role-name ecsPrivateExecutionRole \
  --assume-role-policy-document file://ecs-trust-policy.json

# 3. Attach standard ECS Task Execution policy
aws iam attach-role-policy \
  --role-name ecsPrivateExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# 4. Create policy for SSM & Secrets Manager Access
cat <<EOT > ecs-secrets-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameters",
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "*"
    }
  ]
}
EOT

aws iam put-role-policy \
  --role-name ecsPrivateExecutionRole \
  --policy-name ECSFetchSecretsPolicy \
  --policy-document file://ecs-secrets-policy.json


  # Put an SSM Parameter for App Configuration
aws ssm put-parameter \
  --name "/app/config/theme" \
  --value "fancy-dark-mode" \
  --type "String"

# Put a Secrets Manager secret for RDS Database Credentials
aws secretsmanager create-secret \
  --name "prod/rds/credentials" \
  --secret-string '{"username":"admin","password":"SuperSecretPassword123!","host":"mydb.cluster-xyz.us-east-1.rds.amazonaws.com"}'



# Step 4: Register Task Definition & Deploy ServiceWe will deploy a sample web application using public.ecr.aws/docker/library/httpd:2.4. The ECS Agent automatically injects the SSM parameter and Secrets Manager secret into the container environment variables at launch.  4.1 Register Task Definition

cat <<EOT > task-definition.json
{
  "family": "fancy-app-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::${ACCOUNT_ID}:role/ecsPrivateExecutionRole",
  "containerDefinitions": [
    {
      "name": "fancy-app",
      "image": "public.ecr.aws/docker/library/httpd:2.4",
      "essential": true,
      "portMappings": [
        { "containerPort": 80, "protocol": "tcp" }
      ],
      "secrets": [
        {
          "name": "APP_THEME",
          "valueFrom": "arn:aws:ssm:${AWS_REGION}:${ACCOUNT_ID}:parameter/app/config/theme"
        },
        {
          "name": "DB_CREDENTIALS",
          "valueFrom": "arn:aws:secretsmanager:${AWS_REGION}:${ACCOUNT_ID}:secret:prod/rds/credentials"
        }
      ]
    }
  ]
}
EOT

aws ecs register-task-definition --cli-input-json file://task-definition.json