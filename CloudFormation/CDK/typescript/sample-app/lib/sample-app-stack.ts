import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class SampleAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
/**
    const queue = new sqs.Queue(this, 'SampleAppQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'SampleAppTopic');

    const bucket = new s3.Bucket(this, 'cdkbucket', {versioned:true})

    topic.addSubscription(new subs.SqsSubscription(queue));
**/
  }
}
