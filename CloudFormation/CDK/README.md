Benifit of CDK
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
```

```