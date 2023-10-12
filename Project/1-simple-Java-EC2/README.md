# Simple Java project
## Using AWS ec2, autoscaling, load balancer, active mq, acm, route53, security group, rds

1. ACM certificate for Https connection in loadbalancer
2. Domain Name in Route53/any other (eg. GoDaddy)
3. Security Group
- For Load balancer
    - Inbound
        - HTTPS from everywhere
- For Frontend app
    - Inbound
        - port 8080 from LB sg
        - port 8080 from myip #for troubleshooting purpose only
        - ssh from myip
- For Backend
    - Inbound
        - mysql from frontend sg
        - **check for all ports need for sg from src/main/resources/applicatio.properties**
        - rabbitmq.port=5672 from frontend sg
        - memcached.active.port=11211 from frontend sg
        - all traffic from internal sg
        - ssh from myip
        - elasticsearch.port =9300 from frontend sg (doubt)
4. Access key
- **Name** vprofile-prod-key
5. Source Code
- REF: *https://github.com/hkhcoder/vprofile-project/tree/aws-LiftAndShift*
- Fork it *https://github.com/raghib1992/vprofile-project/tree/aws-LiftAndShift*

6. Launch EC2 Instance

#### For DB
- **Name** vprofile-db01
- **Label** project: vprofile
- **AMI** centos stream 9 x86_64
- **Instance Type** t2.micro
- **key** vprofile-prod-key
- **sg** backend sg
- **userdata** mysql.sh
##### verify
```sh
curl http://169.254.169.254/meta-data/userdata
systemctl status mariadb
mysql -u admin -padmin123 accounts;
```

#### For memcache
- **Name** vprofile-mc01
- **Label** project: vprofile
- **AMI** centos stream 9 x86_64
- **Instance Type** t2.micro
- **key** vprofile-prod-key
- **sg** backend sg
- **userdata** memcache.sh
##### verify
- login to server
- run command
```sh
ss -tunlp | grep 11211
```

#### For rabbitmq
- **Name** vprofile-rmq01
- **Label** project: vprofile
- **AMI** centos stream 9 x86_64
- **Instance Type** t2.micro
- **key** vprofile-prod-key
- **sg** backend sg
- **userdata** rabbitmq.sh
##### verify
- login to server
- run command
```sh
systemctl status rabbitmq-server
```


### For app
- **Name** vprofile-app01
- **Label** project: vprofile
- **AMI** ubuntu 22.04 LTS
- **Instance Type** t2.micro
- **key** vprofile-prod-key
- **sg** Frontend sg
- **userdata** tomcat_ubuntu.sh
#### verify
- login to server
- run command
```sh
systemctl status tomcat9
ls /var/lib/tomcat9/webapps
```
- Create Role
    - s3 full access to ec2


7. Route 53
### Create Private Hosted zone
- **Name** vprofile.in
### Create entry in hostedzone
- db01.vprofile.in
- mc01.profile.in
- rmq01.vprofile.in

## Note
### To change default terminal in VSC
### Ctrl+Shift+p
### Type: Select Default profile
### Select Git Bash


8. Build Artifact
- Install Maven version 3.9.2
- Install Java Version 11.0.19
- Install aws cli
- Build
```
mvn install
```

9. Add Iam User
- **Name** vprofile
- S3 full access Policy
- aws configure
```sh
aws configure --profile vprofile
```
- Create s3 bucket
```sh
aws s3 mk s3://vprofile-test-bucket
```
- copy artifact to s3
```sh
aws s3 cp target/vprofile-v2.war s3://vprofile-test-bucket/
```

10. Copy artifact to app server
- Login into app instance
- install awscli
- copy artifact from s3
```sh
aws s3 cp s3://vprofile-test-bucket/target/vprofile-v2.war /tmp
```
- copy artifact to tomcat
```
syatemctl stop tomcat9
rm -rf /var/lib/tomcat9/webapps/Root
cp /tmp/target/vprofile-v2.war /var/lib/tomcat9/webapps/Root.war
systemctl start tomcat9
ls /var/lib/tomcat9/webapps
```

11. Create Application LB
- target group
    - Name vprofile-app-tg
    - port 8008
    - heath check /login
        - port 8080
    - instance - select app server
- ALB
    - internet facing
    - select elb sg created in step3
    - Listener
        - HTTPS
        - HTTP
- Create ALb alias in Route53

12. Create AMi of app ec2 instance

13. Create Launch Configuration
- Name: vprofile-asg
- AMI: slect ami created in step 12
- IAM ROle: Select IAM role created for s3 full access
- Enable detail monitoring in cloudwatch
- Sg- select frontend sg
- Key: select key created for vprofile-prod-key

14. Create ASG
- **Name**: vprofile-app-asg
- select launch configuration created in step 13
- select vpc
- select Lb
    - select target group
    - enable Health check for LB
- Capacity
- scaling policy- Target Traking Policy
- metric type: cpu utilization
- target value 50
- if want, add sns for notifucation
- tag, project: vprofile