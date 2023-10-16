# Typescript
## Benifit of CDK
    - IDE integration
    - Higher level abstration

# Install Node.js
### Ref
- *https://nodejs.org/en/download*

# Install cdk
```
npm install -g aws-cdk
cdk --version
```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

# Create CDK code
- Create folder
```
mkdir sample-code
cd sample-code
```
- Create sample project structure
```
cdk init sample-app --language typescript
```
- Look for file *CloudFormation\CDK\typescript\sample-app\lib\sample-app-stack.ts*
- Convert CDK code to cloudformation
```
cdk synth
```
#### cdk.out folder created, contain cloudformation template

- Compare deply stack with current state
```
cdk diff
```

- To deploy 
```sh
# Create bootstrap
cdk bootstrap

# Deploy code
cdk deploy
```

## after adding new cdk package 
```
npm install <package>

## exmaple
npm install @aws-cdk/aws-s3
```

- initializer
```
new Bucket(scope: Construct, id: string, props?: BucketProps)
```

- To add acount id and region
```
const envRegion = {account: '1245636964', region: 'eu-north-1'}
```
- Clean up
*********************
# Python script
1. Install cdk tool kit
```
npm install -g aws-cdk
cdk --verison
```

2. Create Directory
```
mkdir python-sample-app
cd python-sample-app
```

3. Initialize cdk 
```
cdk init sample-app --language python
```
4. Create Virtual Environment for Linux
```
source .env/bin/activate
```

5. Install all dependencies in requirement file
```
pip install -r requirements.txt
```

6. Open <folder-name>_stack.py
```sh
# add reources

```

7. Create cloudformation template
```
cdk synth
```
#### Check for cdk.out directory

8. Create bootstrap, to create s3 bucket and store all cloudformation template
```
cdk bootstrap
```

9. Check changes going to implementes
```
cdk diff
```

10. Deploy 
```
cdk deploy
```