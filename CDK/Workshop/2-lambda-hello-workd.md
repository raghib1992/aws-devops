## Lambda handler code
### We’ll start with the AWS Lambda handler code.
1. Create a directory lambda in the root of your project tree.
2. Add a file called lambda/hello.js:
```js
exports.handler = async function(event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`
  };
};
```
3. Edit cdk-workshop-stack.ts
```ts
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

  const hello = new lambda.Function(this, 'HelloHandler', {
    runtime: lambda.Runtime.NODEJS_14_X,
    code: lambda.Code.fromAsset('lambda'),
    handler: 'hello.handler',
  });
    
  }
}
```
3. Test lambda by creating `apigateway-aws-proxy` text case in lambda function
- output
```
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "text/plain"
  },
  "body": "Hello, CDK! You've hit /path/to/resource\n"
}
```
4. Add a LambdaRestApi construct to your stack
- Edit cdk-workshop-stack.ts
