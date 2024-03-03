import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkCloudwatchStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkCloudwatchQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    //Lambda Function
    const newLambda = new lambda.Function(this, 'HelloWorld', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'lambda_function.lambda_handler',
      code: lambda.Code.fromAsset('service')
    });

    //Cloudwatch
    const newCloudwatch = new cloudwatch.Alarm(this, 'mycloudwatch', {
      evaluationPeriods: 1,
      metric: newLambda.metricErrors(),
      threshold: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
    });
  }
}
