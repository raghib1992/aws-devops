# Ref
### For Workshop
- Link: *https://cdkworkshop.com/*
### AWS sample code cdk
- Link: *https://docs.aws.amazon.com/solutions/latest/constructs/welcome.html*

1. Use aws clound 9
2. Create Admin IAM role with admin policy
3. Attach to cloud9 ec2 instance
4. Remove aws managed temp credentials from cloud9 
    - upper right corner setting symbol
    - aws setting
    - credentials
    - disbale (AWS managed temp crdentials)
    - remove crdetnials folder
    ```
    rm -vf ${HOME}/.aws/crdentials
    ```
5. Environmental Config
    - Install jq using yum
    ```
    sudo yum install -y jq
    ```
    - Configure aws cli
    ```
    export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account)
    export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r 'region')
    ```
    - Check region
    ```
    test -n "$AWS_REGION" & echo AWS_REGION is "$AWS_REGION" || echo AWS_REGION is not set
    ```
    - Save into bash_profile
    ```
    echo "export ACCOUNT_ID=${ACCOUNT_ID}" | tee -a ~/.bash_profile
    echo "export AWS_REGION=${AWS_REGION}" | tee -a ~/.bash_profile
    aws configure set default.region ${AWS_REGION}
    aws configure get default.region
    ```
    - Validate the IAM role
    ```
    aws sts get-caller-identity --query Arn | grep <iam role name> -q && echo "IAM Role valid" || echo "Iam role not valid"
    ```
6. Check Node version version
```
node --version
```
7. Check cdk version, need verion 2
```
cdk --version
```
8. Install cdk
```
npm i -g aws-cdk --force
```
9. Create project directory
```
mkdir cdk-workshop && cd cdk-workshop
```
10. cdk init
```sh
# We will use cdk init to create a new TypeScript CDK project:
cdk init sample-app --language typescript
```
### Output should look like this (you can safely ignore warnings about initialization of a git repository, this probably means you don’t have git installed, which is fine for this workshop):
```
Applying project template app for typescript
Initializing a new git repository...
Executing npm install...
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN tst@0.1.0 No repository field.
npm WARN tst@0.1.0 No license field.

# Welcome to your CDK TypeScript project!

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
```
11. Run `npm run watch` in new terminal
12. Run `cdk synth > template.yml` to get template of cloudformation template
13. Run `cdk bootstrap`
```
Bootstrapping an environment #
The first time you deploy an AWS CDK app into an environment (account/region), you can install a “bootstrap stack”. This stack includes resources that are used in the toolkit’s operation. For example, the stack includes an S3 bucket that is used to store templates and assets during the deployment process.

You can use the cdk bootstrap command to install the bootstrap stack into an environment:
```
14. Run `cdk diff`
15. Run `cdk deploy`
16. Clean const from Open **lib/cdk-workshop-stack.ts**
17. Now that we modified our stack’s contents, we can ask the toolkit to show us the difference between our CDK app and what’s currently deployed
```
cdk diff
```
18. Run cdk deploy and proceed to the next section
```
cdk deploy
```