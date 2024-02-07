import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { read, readFile, readFileSync } from 'fs';

export class CdkVpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    //VPC and Subnet
    const demovpc = new ec2.Vpc(this, 'demovpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
      vpcName: 'cdk-vpc',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'ingress',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'application',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
        {
          cidrMask: 28,
          name: 'rds',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        }
      ]
    });

    //security group
    const demosg = new ec2.SecurityGroup(this, 'demosg', {
      vpc: demovpc,
      securityGroupName: 'demo-sg',
      allowAllOutbound: true,
      description: 'sg for demo cdk',
    });
    // Add an ingress rule to allow HTTP traffic from anywhere
    demosg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP traffic');

    //Ec2
    const demoec2 = new ec2.Instance(this, 'demoInstace', {
      vpc: demovpc,
      keyName: 'stockholm',
      securityGroup: demosg,
      vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
    });
    const userData = readFileSync('./lib/userdata.sh', 'utf8');
      demoec2.addUserData(userData);

  }
}
