- Connect Customer Permises to AWS VPC
- Established a dedicated direct network connection between client and aws (bypass internet)
- Benefits
    - Consistence netwrok performance
    - Reduce our bandwidth cost
    - Privacy connectivity to our AWS VPC
### DX virtual interface
1. Public
- access public aws services like s3 and others that are not in the vpc
2. Private
- Enable access toyour vpc
3. Transit
- Access VPC Transit gateway
### DX gateway
1. Virtual gateway
- Allow connection to a single VPC in the region
2. Direct Connect gateway
- Allow connection to multiple VPC
### Tools rto check packet route from source to destination
```
tracert google.com
```
### Monitoring
- Monitor physical AWS Direct connect connections, and virtual interfaces, using CloudWatch
- Cloudwatch collects raw data from AWS Direct Connect, and processes it into readable metrics