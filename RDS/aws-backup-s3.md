# AWS backup

1. Click on **Create New Plan**
2. Slect
- Start with template
- Build a new plan
- Definer a plan using JSON


# Exporting DB snapshot data to Amazon S3
### Ref https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ExportSnapshot.html

### To give DB snapshot tasks access to Amazon S3
1. Create Policy
```sh
# Modify bucket name
aws iam create-policy  --policy-name ExportPolicy --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ExportPolicy",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject*",
                "s3:ListBucket",
                "s3:GetObject*",
                "s3:DeleteObject*",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::raghib-db-backup",
                "arn:aws:s3:::raghib-db-backup/*"
            ]
        }
    ]
}'
```
2. Create an IAM role, so that Amazon RDS can assume this IAM role on your behalf to access your Amazon S3 buckets
```sh
aws iam create-role  --role-name rds-s3-export-role  --assume-role-policy-document '{
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
            "Service": "export.rds.amazonaws.com"
          },
         "Action": "sts:AssumeRole"
       }
     ] 
   }'
```
3. Attach the IAM policy that you created to the IAM role that you created.
```sh
# Modify policy arn created in step 1
aws iam attach-role-policy  --policy-arn your-policy-arn  --role-name rds-s3-export-role
```

### To export a DB snapshot
1. Sign in to the AWS Management Console and open the Amazon RDS console at https://console.aws.amazon.com/rds/.

2. In the navigation pane, choose Snapshots.

3. From the tabs, choose the type of snapshot that you want to export.

4. In the list of snapshots, choose the snapshot that you want to export.

5. For Actions, choose Export to Amazon S3.
- The Export to Amazon S3 window appears.

6. For Export identifier, enter a name to identify the export task. This value is also used for the name of the file created in the S3 bucket.

7. Choose the data to be exported:
- Choose All to export all data in the snapshot.
- Choose Partial to export specific parts of the snapshot. To identify which parts of the snapshot to export, enter one or more databases, schemas, or tables for Identifiers, separated by spaces.
  - Use the following format:
```sh
  database[.schema][.table] database2[.schema2][.table2] ... databasen[.scheman][.tablen]
  # For example
  mydatabase mydatabase2.myschema1 mydatabase2.myschema2.mytable1 mydatabase2.myschema2.mytable2
```
8. For S3 bucket, choose the bucket to export to.
- To assign the exported data to a folder path in the S3 bucket, enter the optional path for S3 prefix.

9. For IAM role, either choose a role that grants you write access to your chosen S3 bucket, or create a new role.
- If you created a role by following the steps in Providing access to an Amazon S3 bucket using an IAM role, choose that role.
- If you didn't create a role that grants you write access to your chosen S3 bucket, then choose Create a new role to create the role automatically. Next, enter a name for the role in IAM role name.

10. For AWS KMS key, enter the ARN for the key to use for encrypting the exported data.

11. Choose Export to Amazon S3.

### Monitoring snapshot exports
1. Sign in to the AWS Management Console and open the Amazon RDS console at https://console.aws.amazon.com/rds/.
2. In the navigation pane, choose Snapshots.
3. To view the list of snapshot exports, choose the Exports in Amazon S3 tab.
4. To view information about a specific snapshot export, choose the export task.