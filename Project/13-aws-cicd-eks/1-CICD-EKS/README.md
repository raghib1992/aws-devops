# DevOps With AWS

### Step 1: Required tools
1. Install aws cli
2. Install kubectl
3. Install aws-iam-authenticator
4. Install eksctl


### Step 2: Create cluster yaml file to create eks cluster
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: cicd-demo #cluster name
  region: us-west-2 #desired region

nodeGroups:
  - name: ng-1 #cluster node group name
    instanceType: t2.medium #desired instance type
    desiredCapacity: 3 #desired nodes count / capacity
    ssh:
      allow: false # if true - will use ~/.ssh/id_rsa.pub as the default ssh key
      #publicKeyPath: ~/.ssh/ec2_id_rsa.pub #you can specify the public key path likr this as well
```
### Step 3: Create Cluster
```sh
eksctl create cluster -f manifest-file/cluster.yaml
```

### Step 4: Create Dockerfile
```t
FROM node:14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
```

### Step 5: Create D0cker Image
```sh
docker build -t cicd-demo:v1 .
```

### Step 6: Test the Docker Image by running container locally
```sh
docker run -d -p 3000:3000 --name cicd-demo --rm cicd-demo:v1
```

### Step 7: Create ECR Repo, Named cicd-demo

### Step 8: Retrieve an authentication token and authenticate your Docker client to your registry.
```sh
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 561243041928.dkr.ecr.eu-north-1.amazonaws.com
```

### STep 9: Tag your Docker Image
```sh
docker tag cicd-demo:v1 561243041928.dkr.ecr.eu-north-1.amazonaws.com/cicd-demo:latest
```
### Step 10: Push your Docker Image to ECR
```sh
docker push 561243041928.dkr.ecr.eu-north-1.amazonaws.com/cicd-demo:latest
```

### Step 11: Create Deployment file
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: cicd-demo
    app.kubernetes.io/instance: cicd-demo-instance
    app.kubernetes.io/version: '1.0.0'
    app.kubernetes.io/managed-by: kubectl
  name: cicd-demo-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cicd-demo
  template:
    metadata:
      labels:
        app: cicd-demo
    spec:
      containers:
        - image: 561243041928.dkr.ecr.eu-north-1.amazonaws.com/cicd-demo:latest
          imagePullPolicy: Always
          name: cicd-demo
          ports:
            - containerPort: 3000
```

### Step 12: Create Service.yaml file
```yml
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: cicd-demo
    app.kubernetes.io/instance: cicd-demo-instance
    app.kubernetes.io/version: "1.0.0"
    app.kubernetes.io/component: backend
    app.kubernetes.io/managed-by: kubectl
  name: cicd-demo
spec:
  selector:
    app: cicd-demo
  type: LoadBalancer
  ports:
   -  protocol: TCP
      port: 80kubectl apply -f .\manifest-file\
      targetPort: 3000
```

### Step 13: Create Deployment and Service Resources in Cluster
```sh
kubectl apply -f .\manifest-file\
```

### Step 14: Update app version by edit line
```
app.get('/', (req, res) => {
  res.send('Cicd Demo App .v2')
})
```
### Step 15: Recreate Docker Image and Push to ECR

### Step 16: Update deployment by recreate deployement
```sh
kubectl rollout restart deployment/cicd-demo-deployment
```
### Step 17: Create AWS Code-Commit, Name: codeDeployDemo

### Step 18: Clone it locally

### Step 19: Copy all the files into Repo

### Step 20: Push the changes to remote repo

### Step 21: Create CodeBuild
- Give suitable name to you codebuild
- **Source**: Select codeCommit repo in 
- **Environment**: 
    - OS Amazon Linux
    - Runtime: Standard
    - Image: latest
    - Create new service role
- **Buildspec**
    - mention name for custome buildspec name `buildspec_eks.yaml`
- Rest as Default

### Step 22: Create awsPipeline
- Select codecommit
- Select CodeBuild
- Env Variable
```
AWS_DEFAULT_REGION: us-west-1
AWS_CLUSTER_NAME: cicd-demo
AWS_ACCOUNT_ID: 561243041928
IMAGE_REPO_NAME: cicd-demo
IMAGE_TAG: latest
```

### NOTE: Build fail due to access. Now we need to provide access in auth-conf file

### Step 23: Create create_iam_role.sh file to create IAM role
```t
#!/usr/bin/env bash
TRUST="{   \"Version\": \"2012-10-17\",   \"Statement\": [     {       \"Effect\": \"Allow\",       \"Principal\": {         \"Service\": \"codebuild.amazonaws.com\"       },       \"Action\": \"sts:AssumeRole\"     }   ] }"

echo '{ "Version": "2012-10-17", "Statement": [ { "Effect": "Allow", "Action": "eks:Describe*", "Resource": "*" } ] }' > /./iam-role-policy

aws iam create-role --role-name CodeBuildKubectlRole --assume-role-policy-document "$TRUST" --output text --query 'Role.Arn'

aws iam put-role-policy --role-name CodeBuildKubectlRole --policy-name eks-describe --policy-document file:///./iam-role-policy

aws iam attach-role-policy --role-name CodeBuildKubectlRole --policy-arn arn:aws:iam::aws:policy/CloudWatchLogsFullAccess

aws iam attach-role-policy --role-name CodeBuildKubectlRole --policy-arn arn:aws:iam::aws:policy/AWSCodeBuildAdminAccess

aws iam attach-role-policy --role-name CodeBuildKubectlRole --policy-arn arn:aws:iam::aws:policy/AWSCodeCommitFullAccess

aws iam attach-role-policy --role-name CodeBuildKubectlRole --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-role-policy --role-name CodeBuildKubectlRole --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess
```

### Step 24: Execute the file
```sh
chmod +x ./create_iam_role.sh
./create_iam_role.sh
```

### Step 25: verify the IAM role in aws account, Role Name is `CodeBuildKubectlRole`

### Step 26: Get the aws-auth.yaml
```
kubectl get configmaps aws-auth -n kube-system -o yaml > aws-auth.yaml
```

### Step 27: Add line in aws-auth.yaml mapRoles
```
- groups:
      - system:masters
      rolearn: arn:aws:iam::561243041928:role/CodeBuildKubectlRole
      username: CodeBuildKubectlRole
```

### Step 28: Apply aws-auth
```sh
kubectl apply -f aws-auth.yaml
```

### Step  29: Make sure CodeBuild Env has Enable Build Docker Image

### Step 30: Update the Service ROLE arn as per your new Role ARN

### Step31: Delete the cluster
```
eksctl delete cluster -f manifest-file/cluster.yaml
```
### Step 32: delete codecommit repo, ECR, Code Build, Code Pipeline