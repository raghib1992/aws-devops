# CLoud Formation
### Ref sample cloudformation template
- *https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/sample-templates-services-us-west-2.html*


# template Anatomy
```yaml
AWSTemplateFormatVersion: "2010-09-09",
Description:
Metadata:
Parameters:
Mappings:
Conditons:
Transform:
Resources:
Outputs:
```
## Parameter
- MAX 60 PARAMTER
- Alphanumeric and unique
- Type
   - String
   - Number
   - List
   - CommaDelimiterList
   - aws specific parameter types
   - ssm parameter
   - parameter converted to string for referrence elsewhere

```yaml
Parameters:
  # Any random name as per convience
  InstanceTypeParamter:
    Type: String
    Default: t2.micro
    Allowedvalues: [ t2.micro, m1.small, m1.large ]
    Description: "Choose the instance type to create your ec2 instance"
```
# Cost of clloudformation stack
- cloud formation is free
- you pay for the resources spun up

# Stack Dependencies
```yml
AWSTemplateFormatVersion: "2010-09-09"
Description: "VPC and Subnet with stack dependencies in Stockholm"
Resources: 
    MyVPC:
    MySubnet:
        VpcId: !Ref MyVPC
```
### Check 01-Stack_Dependencies.yaml
*******************************
# Depends on Attribute
#### A resource is created which depends on another resources
#### Check 02-Depends_Attribute.yaml file
*****************************
# Error
1. Validation Error
- The validation error occurs when CloudFormation cannot parse the template.
2. Semantic Error/Post API
- It is not detected till resources is being created or being updated

### When CF creation fail, it rollback
#### TO disbale rollback complete
- Stack Creation option -> Rollback on failure -> disable


# Change Set
- It allow us to submit the create a change set  by submitting  changes against  the stack you want to update
- CF compare the stack to the new template  and/or parameter values and produces a change set  that you review  and then choose to apply

# Paramter

# Deletion Policy Attribute
## Once stack is delete, resources will retian
```yaml
Resources:
  mys3:
    Type: 'AWS::S3::Bucket'
    DeletionPolicy: Retain
```

# Stack Set
- Allow us to deploy stack across multiple aws account /aws region from single location
- Deployemnt Instaruction
1. Iam roles required for Admin account for stackSets 
  - Create Iam role
  - Inline policy
```json
{  
   "Version":"2012-10-17",
   "Statement":[  
      {  
         "Action":[  
            "sts:AssumeRole"
         ],
         "Resource":[  
            "arn:aws:iam::*:role/AWSCloudFormationStackSetExecutionRole"
         ],
         "Effect":"Allow"
      }
   ]
}
``` 
  - Choose Service: CloudFormation
  - Name: AWSCloudFormationStackSetAdministratorRole
2. Iam roles for Destination Aws account
  - Create role for another aws account
  - Add Policy: Admin access
  - Name AWSCloudFormationStackSetExecutionRole
3. Create stack set
  - select role
  - select template
  - select region

4. Delete Stack from StackSet
  - Action -> Delete Stack from Stack Set

# Nested Stack
## Similar as module in Terraform

# Creation POlicies
#### Resources Completeing will show after getting success comand from resources
```yml
CreationPolicy:
      ResourceSignal:
        Timeout: PT15M
        Count: 1
```
```sh
aws cloudformation signal-resource --stack-name Demo-Creation-Policy --logical-resource-id myInstance --unique-id i-004b16af9be680355 --status SUCCESS
```


## Waited Condition

```yml
Resources:
  Ec2Instance:
    Type: "AWS::EC2::Instance"
    Properties:
      ImageId: ami-086ee6e5ed2ea3434
      InstanceType: t3.micro

  PrivateWaitHandle:
    Type: AWS::CloudFormation::WaitConditionHandle

  PrivateWaitCondition:
    Type: AWS::CloudFormation::WaitCondition
    Properties:
      Handle: !Ref PrivateWaitHandle
      Timeout: '3600'
      Count: 1
```
```sh
curl -X PUT -H 'Content-Type:' --data-binary '{"Status" : "SUCCESS","Reason" : "Configuration Complete","UniqueId" : "ID1234","Data" : "Application has completed configuration."}' "https://cloudformation-waitcondition-eu-north-1.s3.eu-north-1.amazonaws.com/arn%3Aaws%3Acloudformation%3Aeu-north-1%3A561243041928%3Astack/demo/3919e4b0-56bd-11ee-9ce6-0e0abc6a1862/PrivateWaitHandle?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230919T072203Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=AKIAYOLCI72BZIFAVVX4%2F20230919%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=bec65d73a11645ce9695766700d1f194e832504bb3e262c61b9a99789aa5d596"
```