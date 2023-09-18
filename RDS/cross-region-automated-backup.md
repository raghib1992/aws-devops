# Enabling cross-Region automated backups
Ref https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReplicateBackups.html
Sign in to the AWS Management Console and open the Amazon RDS console at https://console.aws.amazon.com/rds/.

In the navigation pane, choose Automated backups.

On the Current Region tab, choose the DB instance for which you want to enable backup replication.

For Actions, choose Manage cross-Region replication.

Under Backup replication, choose Enable replication to another AWS Region.

Choose the Destination Region.

Choose the Replicated backup retention period.

If you've enabled encryption on the source DB instance, choose the AWS KMS key for encrypting the backups.

Choose Save