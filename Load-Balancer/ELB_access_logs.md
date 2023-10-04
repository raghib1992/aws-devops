### Ref
- *https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html#verify-bucket-permissions*

### Bucket POlicy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::897822967062:root"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::raghib-nlb-demo-access-logs/prefix/AWSLogs/561243041928/*"
        },
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "delivery.logs.amazonaws.com"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::raghib-nlb-demo-access-logs/prefix/AWSLogs/561243041928/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}
```

### Enable access logs for your load balancer using the console
- On the Attributes tab, choose Edit.
- For Monitoring, turn on Access logs.
- For S3 URI, enter the S3 URI for your log files. The URI that you specify depends on whether you're using a prefix.
- URI with a prefix: s3://bucket-name/prefix
- URI without a prefix: s3://bucket-name
- Choose Save changes.
