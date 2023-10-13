# Paramter
## List Paramter
```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: "ec2 Instance and Db"
Resources:
  myInstance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: "ami-08426983bce362936"
      # InstanceType: "t2.micro"
      InstanceType: !Ref InstanceType
Parameters:
  InstanceType:
    Type: String
    Default: t2.micro
    AllowedValues:
      - t2.micro
      - m1.small
      - m1.large
    Description: Select the instance type from above list


## String Parameter
```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: "Create SNS Topic"
Parameters:
  SNSEmail:
    Type: String
    Description: "Enter email for SNS topic"
Resources:
  AlertSNSTopic:
    Type: "AWS::SNS::Topic"
    Properties:
      Subscription:
          - Endpoint: !Ref SNSEmail
            Protocol: "email"
```