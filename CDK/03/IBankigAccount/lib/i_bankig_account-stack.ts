import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class IBankigAccountStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //s3 bucket
    const Ibucket = new s3.Bucket(this, 'IBucket001', {
      bucketName: 'ibucketaccount001',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    //IAM Role
    const LambdaRole = new iam.Role(this, 'LamdaS3Role', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        roleName: 'lambdaS3Access',
        description: 'Aws Iam role for lambda to assume s3 access policy'
    });
    LambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));

    //Lambda
    const ILambda = new lambda.Function(this, 'ILmabda001', {
      runtime: lambda.Runtime.PYTHON_3_12,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'lambda_function.lambda_handler',
      role: LambdaRole,
    });

    //Apigateway
    const IApigw = new apigw.LambdaRestApi(this, 'IApigw001', {
      handler: ILambda,
      restApiName: 'bankingrestApi',
      deploy: true,
      proxy: false,
    });
    
    //ApiMethod
    const IBankingMethod = IApigw.root.addResource('banking');
    IBankingMethod.addMethod('GET');

  }
}
