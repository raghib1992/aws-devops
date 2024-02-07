# Replicate Bucket Object to other Region
## Replication Rule
### Replicate BucketA object in Stockholm Region to BucketB in Mumbai Region
- BucketA
    - Enable Versioning
    - Management -> Replication Rule
    - Create RUle
    - Select Destination Bucket i.e. BucketB
- BucketB
    - Enable versioning
*********************************

# Cross Account S3 Bucket Configuration
## Bucket in AccountA (Central Account) and ec2 from AccountB and C push logs to S3 Bucket in Account A.
- Account A
    - Add Bucket policy in central s3 bucket and allow the account B to push logs
    - Policy
```json
// Allow Account B to push Logs to Central S3 Bucket
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                // Central Account S3 Bucket ARN
                "arn:aws:s3:::central account bucket/*"
            ],
            "Principal": {
                //Account B ARN
                "AWS": "arn:aws:iam::123456789:root"
            }
        }
        
    ]
}
```
- Account B
    - attach role to Ec2 in account B with policy
    - policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                // Central Account S3 Bucket ARN
                "arn:aws:s3:::central account bucket/*"
            ]
        }
        
    ]
}
```
# S3 bucket Replicate to Cross Account Bucket
### Source Bucket
- Create Replication Rule
- Enable Versioning
- Select Destination Account ID and Bucket
- Attach IAM Role
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:ListBucket",
                "s3:GetReplicationConfiguration",
                "s3:GetObjectVersionForReplication",
                "s3:GetObjectVersionAcl",
                "s3:GetObjectVersionTagging",
                "s3:GetObjectRetention",
                "s3:GetObjectLegalHold"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:s3:::sample-demo-project",
                "arn:aws:s3:::sample-demo-project/*",
                "arn:aws:s3:::umber-cloud-app",
                "arn:aws:s3:::umber-cloud-app/*"
            ]
        },
        {
            "Action": [
                "s3:ReplicateObject",
                "s3:ReplicateDelete",
                "s3:ReplicateTags",
                "s3:ObjectOwnerOverrideToBucketOwner"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:s3:::sample-demo-project/*",
                "arn:aws:s3:::umber-cloud-app/*"
            ]
        }
    ]
}
```

### Destination Bucket
- Enable Versioning
- Edit Bucket Poicy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::{source account id}:root",
                    "arn:aws:iam::{source account id}:role/service-role/{ROle created for source bucket replication role}"
                ]
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:ReplicateDelete",
                "s3:ReplicateObject"
            ],
            "Resource": [
                "arn:aws:s3:::{Destination Bucket}",
                "arn:aws:s3:::{Destinatiobn}/*"
            ]
        }
    ]
}
```


```json
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "eb-af163bf3-d27b-4712-b795-d1e33e331ca4",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::561243041928:role/vprofile-bean-role"
            },
            "Action": [
                "s3:ListBucket",
                "s3:ListBucketVersions",
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": [
                "arn:aws:s3:::elasticbeanstalk-eu-north-1-561243041928",
                "arn:aws:s3:::elasticbeanstalk-eu-north-1-561243041928/resources/environments/*"
            ]
        },
        {
            "Sid": "eb-58950a8c-feb6-11e2-89e0-0800277d041b",
            "Effect": "Deny",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:DeleteBucket",
            "Resource": "arn:aws:s3:::elasticbeanstalk-eu-north-1-561243041928"
        }
    ]
}
```