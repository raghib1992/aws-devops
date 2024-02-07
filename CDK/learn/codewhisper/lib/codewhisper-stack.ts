import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';




export class CodewhisperStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Create VPC
    const vpc = new cdk.aws_ec2.Vpc(this, "CodewhisperVpc", {
      ipAddresses: cdk.aws_ec2.IpAddresses.cidr("10.0.0.0/16"),
      vpcName: "CodewhisperVpc",
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "CodewhisperPublicSubnet",
          subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
          mapPublicIpOnLaunch: true,
        },
        {
          cidrMask: 28,
          name: "CodewhisperPrivateSubnet",
          subnetType: cdk.aws_ec2.SubnetType.PRIVATE_ISOLATED,
        } 
      ]
    });


    //Create RDS Instance
    const rds = new cdk.aws_rds.DatabaseInstance(this, "CodewhisperRds", {
      vpc: vpc,
      engine: cdk.aws_rds.DatabaseInstanceEngine.MYSQL,
      vpcSubnets: { subnetType: cdk.aws_ec2.SubnetType.PRIVATE_ISOLATED },
    });

  }
}
