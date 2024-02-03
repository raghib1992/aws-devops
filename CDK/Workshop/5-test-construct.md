# Fine-Grained Assertion Tests #
## Create a test for the DynamoDB table

1. If cdk init created a test directory for you, then you should have a cdk-workshop.test.ts file. Delete this file.

2. If you do not already have a test directory (usually created automatically when you run cdk init), then create a test directory at the same level as bin and lib and then create a file called hitcounter.test.ts with the following code.
```ts
import { Template, Capture } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { HitCounter }  from '../lib/hitcounter';

test('DynamoDB Table Created', () => {
  const stack = new cdk.Stack();
  // WHEN
  new HitCounter(stack, 'MyTestConstruct', {
    downstream:  new lambda.Function(stack, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset('lambda')
    })
  });
  // THEN

  const template = Template.fromStack(stack);
  template.resourceCountIs("AWS::DynamoDB::Table", 1);
});
```

3. This test is simply testing to ensure that the synthesized stack includes a DynamoDB table.

- Run the test.
```
npm run test
```
## Create a test for the Lambda function

1. Create a new test in hitcounter.test.ts with the below code:
```
test('Lambda Has Environment Variables', () => {
  const stack = new cdk.Stack();
  // WHEN
  new HitCounter(stack, 'MyTestConstruct', {
    downstream:  new lambda.Function(stack, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset('lambda')
    })
  });
  // THEN
  const template = Template.fromStack(stack);
  const envCapture = new Capture();
  template.hasResourceProperties("AWS::Lambda::Function", {
    Environment: envCapture,
  });

  expect(envCapture.asObject()).toEqual(
    {
      Variables: {
        DOWNSTREAM_FUNCTION_NAME: {
          Ref: "TestFunctionXXXXX",
        },
        HITS_TABLE_NAME: {
          Ref: "MyTestConstructHitsXXXXX",
        },
      },
    }
  );
});
```

2. Save the file and run the test again.
```
npm run test
```

3. This time the test should fail and you should be able to grab the correct value for the variables from the expected output.

4. Now run the test again. This time is should pass.