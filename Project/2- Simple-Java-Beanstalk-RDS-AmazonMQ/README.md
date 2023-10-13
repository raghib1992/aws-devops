# Simple Java Project
## Beanstalk, ALB, ASG, RDS, ActiveMQ, Elastic-cache, Route53, Cloudfront

1. Create key pair
- **Name** vprofile-prod-key

2. Security group
 For Load balancer
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

3. Create RDS
- Subnet Group
    - **Name** vprofile-rds-sub-grp
    - Select all AZ
    - Select all Subnet
- Prarmeter group
    - **paramter grouip family:** mysql8
    - Type: DB Paramter Group
    - **GroupName:** vprofile-rds-para-grp
    - Description: For vprofile rds
- Create DB
    - Mysql
    - version MYSQL8
    - template Dev/Test
    - Single db instance
    - **DB instance identifier:** vprofile-rds-mysql
    - Master username: admin
    - DB instance classes db.t2.micro
    - Storage type: GP2
    - Allocated Storage 20GB
    - Disable autoscaling
    - Default vpc
    - subnet grp
    - public access No
    - Enable Monitoring
    - database name: accounts
    - DB paramter: vprofile-rds-para-grp

- Create ec2 in same vpc to access rds
     - install mysql client
     - ubuntu: mysql-client 
     - centos: maraidb
     - clone vprofile github repo
     - run 
```sh
mysql -h db-endpoitn -u admin -padmin123 accounts < src/main/reources/db_backup.sql
```

4. Creqate ElastiCache
- Create subnet group
- Create paramter group
    - version memcached1.6
- Create memcached cluster
    - node type cache.t2.micro
    - SG - slelct backend-sg


5. AmazonMQ
- RabbitMQ
- Single Instance broker
- Broker Name vprofile-emq
- borker instance tyep mq.t3.micro
- username rabbit
- password Blue7890bunny
- Broker engine version: 3.10.20
- Network and securty : private
- sg- backend-sg

     
6. Create Beanstalk (PaaS)
- IAM Roles
    - roles for ec2
    - policies
        - aws elasticbeanstalkweb tier
        - Administrator access- aws elasticbeanstalk
        - aws elasticbeanstalk role sns
        - aws elasticbeanstalk custom platform ec2 role
    - Name: vprofile-bean-role
- creat beanstalk
    - select web server env
    - app name vprofile-app
    - env: vprofile-app-prod
    - Doamin: any unquie name
    - Platform
        - type: managed
        - platform: tomcat
        - platform branch: tomcat8.5 with corretto11 amazon linux2
        - platform version: 5
    - prsets: custom configuration
    - roles:
        - serice role: create new service role
        - instance: select created above
        - select key
    - vpc
    - Do not create db with beanstalk
    - sg - create new sg
    - capacity
        - load balances
