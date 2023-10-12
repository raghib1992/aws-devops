# VPC Flow Logs
- Record the traffic information that is visiting the resources (eg. EC2)
- Record data about resources connecting to which outbound endpoint
### vpc flow logs capture traffics at an interface level, and do not capture real time log stream for your network interface

# Create VPC Flowlogs
1. Create Cloudwatch log group
- **Name**: demo-vpc-flowlog-cw

2. Create flow log
- **Name**: demo-flowlog
- **Destination:** CLoudwatch
- **IAM**

# Type of traffic not logged
- amazon dns server
- window instance for amazon window license activation
- traffic from 169.254.169.254
- DHCP traffic