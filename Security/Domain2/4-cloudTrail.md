# In linux we use auditd to record events
# Simalarly we use cloudtrail in aws to record events


# Default cloud trail configuration
- events deleted after N days

# New Trail
- enable customize the recording patterns
- deliver cloud trail events to s3, cloud watch Logs etc

# Events Type

- Management Events
    - provide information about managemtn operation that are performed on the resources in your aws account
    - eg- Create EC2 instance, create iam user etc
- Data Events
    - provide information about resources opertation performed on or in a resource and are often high volume activities
- Insights Events
    - unusal opertion activity in thier aws account such as spikes in resources provisioning, burst of aws IAM action

# CLoudtrail log file integrity validation allows us to determine whether alog file was modified, deleted, or unchanged after cloudtraiol delivered it.

```sh
# get the list of cloudtrail
aws cloudtrail list-trails

# validate cloudtrail logs
aws cloudtrail validate-logs --trail-arn <get arn from above command> --start-time 2015-01-08T05:21:42Z --end-time 2015-01-08T05:21:42Z --verbose --region eu-north-1
```