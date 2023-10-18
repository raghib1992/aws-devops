# Java Application Continuos Delivery

## Create Beanstalk, RDS, Software Testing using Selinium

1. Create key pair
- **Name** vprofile-prod-key

2. Security group
- For Load balancer
    - Inbound
        - HTTPS from everywhere
<!-- - For Frontend app
    - Inbound
        - port 8080 from LB sg
        - port 8080 from myip #for troubleshooting purpose only
        - ssh from myip -->
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
    - Master Password: admin123
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

<!-- 4. Creqate ElastiCache
- Create subnet group
- Create paramter group
    - version memcached1.6
- Create memcached cluster
    - Cluster name: vprofile-mc
    - node type cache.t3.micro
    - SG - slelct backend-sg -->

<!-- 
5. AmazonMQ
- RabbitMQ
- Single Instance broker
- Broker Name vprofile-emq
- borker instance tyep mq.t3.micro
- username rabbit
- password Blue7890bunny
- Broker engine version: 3.10.20
- Network and securty : private
- sg- backend-sg -->

     
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
    - Service access
        - service role: create new service role
        - instance profile: select created above
        - select key
    - vpc
        - Select Default vpc
        - Do not create db with beanstalk
    - Instance
        - sg - create new sg
    - capacity
        - load balances
            - min 2, max 4

<!-- 7. Update ACL in s3
- Go s3 bucket
- look for beanstalk bucket
- Permission
- ACL - Object Ownership - ACLs enabled -->

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

12. Modify pom.xml file repositories url line 210
13. Modify settings.xml file Repositories and Mirrors

14. Modify codebuild: vprofile-build-sonar
    - branch: select cd-aws

15. Modify codebuild: vprofile-build-artifact
    - branch: select cd-aws

16. Create SSM Parameter
- SSM -> Paramter Store
    1) 
    - Name: RDS-Endpoint
    - Type: string
    - Data type: text
    - Value: vprofile-rds-mysql.ctysujhh48kb.eu-north-1.rds.amazonaws.com
    2) 
    - Name: RDSUSER
    - Type: string
    - Data type: text
    - Value: admin
    3) 
    - Name: RDSPASS
    - Type: string
    - Data type: text
    - Value: admin123
    4) 
    - Name: codeartifact-token
    - Type: securestring
    - Data type: text
    - Value: <codeartifact token> ## Recreate the token

17. Create code build 
- deploy artifact to Beanstalk
    - Name: vprofile-build-release
    - SOurce: codecommit
    - Repo: vprofile-code-repo
    - Branch: cd-aws
    - OS: Ubuntu
    - Runtime: Standard
    - Image: Standard3.0 
    - ServiceROle: Select existing role from vprofile-build-sonar build project
    - update buildspec.yml file (get updated file build_release_buildspec.yml)
    - Cloudwatch log group Name: vprofile-cicd-buildlogs
    - Stream Name: buildreleasejob
    #### Modify of the role not required
    - Modify the service role to give it access of paramter store
        - Get role name edit env
        - IAM ROLE
        - Attach Policy
            - service: systems manager
            - Action: List-describe-paramter
                      Read-describeDocumentParamters, GetParamter, GetParamters, GetParameterHistory, GetParamterByPath
            - Resources: For this account
            - Name: vprofile-sonar-para-access
    - Start Build
- Software Testing
    - Name: vprofile-software-testing
    - SOurce: codecommit
    - Repo: vprofile-code-repo
    - Branch: seleniumAutoScripts
    - OS: WindowServer2019
    - Runtime: Base
    - Image: window-base:2019-1.0
    - ServiceRole: Select existing role from vprofile-build-sonar build project
    - update buildspec.yml file (get updated file win_buildspec.yml)
    - Artifacts
        - Amazon s3
        - Select Bucket Name
        - Enable Semantic versioning
        - Artifacts packing: zip
    - Cloudwatch log group Name: vprofile-selenium-logs
    - Stream Name: buildreleasejob
    #### Modify of the role not required
    - Modify the service role to give it access of paramter store
        - Get role name edit env
        - IAM ROLE
        - Attach Policy
            - service: systems manager
            - Action: List-describe-paramter
                      Read-describeDocumentParamters, GetParamter, GetParamters, GetParameterHistory, GetParamterByPath
            - Resources: For this account
            - Name: vprofile-sonar-para-access
    - Start Build
    
18. Create codepipeline
- Name: vprofile-cicd-pipeline
- Service Role: create new role
- Source Provider
    - source: Codecommit
    - repo: vprofile-code-repo
    - branch: cd-aws
    - Change detection option: cloudwatch
- Build provider
    - aws codebuild
    - region Stockholm
    - project name: vprofile-build-release
- Deploy Stage
    - deploy provider: aws elastic beanstalk
    - appliction name:
    - env name
- create pipeline

8. Edit Codepipeline
- Add stage before vprofile-build-release
    - stage name: Test
    - Add action group 
        - name: sonar-code-analysis
        - provider: codebuild
        - region: stockholm
        - input artifact: source artifact 
        - project name: vprofile-build-sonar
        - build type: single 
- Add stage after sonar-code-analysis
    - stage name: BuildAndStore
        - name: BuildAndStore
        - provider: codebuild
        - region: stockholm
        - input artifact: source artifact 
        - project name: vprofile-build-artifact
        - output artifact: BuildArtifact
- Add stage after BuildAndStore
    - stage name: Deploy
        - name: deploy-to-s3
        - action provider: amazon s3
        - region: stockholm
        - input artifacts: build artifacts
        - bucket name: 
        - object key: pipeline-artifacts
- Edit buildandRelease 
    - output artifacts: BuildArtifactToBean
- Edit Deploy
    - input artifatcs: BuildArtifactToBean
- Add stage after Deploy
    - stage name: Software Testing
        - name: SoftwareTesting
        - provider: codebuild
        - region: stockholm
        - input artifact: source artifact 
        - project name: vprofile-software-testing
        - output artifact: BuildArtifact
- Settings -> Notification 
    - create notificatio rule
        - name: vprofile-ci-pipeline-notification
        - type: full
        - action
        - target: sns topic
- run pipeline