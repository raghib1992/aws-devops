# Simple Java Project
## Beanstalk, ALB, ASG, RDS, ActiveMQ, Elastic-cache, Route53, Cloudfront

1. Create key pair
- **Name** vprofile-prod-key

2. Security group
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
        - ssh from myip

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
    - **database**
        - name: accounts
        - DB paramter: vprofile-rds-para-grp

- Create ec2 in same vpc to access rds to create required db, tables
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
    - Cluster name: vprofile-mc
    - node type cache.t3.micro
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
        - AdministratorAccess-AWSElasticBeanstalk
        - AWSElasticBeanstalkCustomPlatformforEC2Role
        - AWSElasticBeanstalkRoleSNS
        - AWSElasticBeanstalkWebTier
    - Name: vprofile-bean-role
- creat beanstalk 
    
    - app name vprofile-app
    - env: 
        - name: vprofile-app-prod
        - select web server env
        - Domain: any unquie name
    - Platform
        - type: managed
        - platform: tomcat
        - platform branch: tomcat8.5 with corretto11 amazon linux2
        - platform version: 5
        - presets: custom configuration
        - roles:
            - service role: create new service role
            - instance profile: select created above
            - select key
        - vpc
        - Do not create db with beanstalk
        - sg - create new sg
        - capacity
            - load balances

7. Update ACL in s3
- Go s3 bucket
- look for beanstalk bucket
- Permission
- ACL - Object Ownership - ACLs enabled

8. Add health check
- Beanstalk -> Environment -> Configuration -> Instance traffic and scaling
- Process -> Edit -> 
- Health Check -> Path -> /login
- Enable session stickness

9. Add https listener
- Beanstalk -> Environment -> Configuration
- Listeners -> add listener

10. Edit backend sg
- Ec2 -> Copy the sg-id
- Go to backend sg, EDit
- Inbound RUle
- All traffic from sg-id (copy above)

11. Update application.properties
- db01 = rds endpoints
- mc01 = memchached endpoints
- rmq01 = rabbitmq url
- rmq port = as per amazon rmq port
- rmq username = rabbit
- rmq password = Blue7890bunny

12. Build the artifacts
- Install mvn locally
- mvn -version
- mvn install
- check 'target/**.war file'

13. Deploy artifacts
- Beanstalk -> Environment -> Upload and deploy

14. Create DNS for elactic dns in Route 53
- Alias: vprofile.raghib.in

15. Check 
- *http://vprofile.raghib.in/login*
username: admin_vp
password: admin_vp