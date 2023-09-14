1. Create s3 bucket
2. enable event-notification
- properties -> event notification -> Create event Notification
    - select event types
    - Destination -SNS
    - Select the SNS topic (created in next step)
3. Create SNS topic 
4. Create SNS email subscription
4. Update SNS access policy
```json
{
 "Version": "2012-10-17",
 "Id": "example-ID",
 "Statement": [
  {
   "Sid": "example-statement-ID",
   "Effect": "Allow",
   "Principal": {
     "Service": "s3.amazonaws.com"
   },
   "Action": [
    "SNS:Publish"
   ],
   "Resource": "arn:aws:sns:eu-north-1:561243041928:ssn-automation",
   "Condition": {
      "ArnLike": { "aws:SourceArn": "arn:aws:s3:::raghib7092000" }
   }
  }
 ]
}
```
### Test it by uploading the file into s3 and check email for notification
