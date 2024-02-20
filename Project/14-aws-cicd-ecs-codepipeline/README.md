1. Create ec2 linux instance
2. Login to ec2 machine
```sh
yum update
yum install docker -y
service docker start
docker info
docker pull centos:centos6
docker images
docker run -it -p 80:80 <image id>
yum install httpd
cd /var/www/html
echo "I coming form container" > index.html
service httpd start
```
3. Check on browser the index file must host on container
4. Again ssh into ec2 instance
```sh
docker ps
docker ps -a
```
5. Create docker file
```t
FROM centos:centos6

MAINTAINER Raghib Nadim

RUN yum install -y httpd

COPY index.html /var/www/html/

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
```
6. Create index.html file
```html
<html>
    <body>
        <h1>
            CICD and Docker Tutorial
        </h1>
        <p style="background-color: mediumseagreen;">Version One in Sea Green Color</p>
    </body>
</html>
```
7. Create docker image
```sh
docker build -t raghib1992/centos6 . 
```
8. Create container
```sh
docker run -d --name web -p 80:80 raghib1992/centos6
```
9. Create Repo in ECR
### Step 1: Retrieve an authentication token and authenticate your Docker client to your registry.
```sh
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 561243041928.dkr.ecr.eu-north-1.amazonaws.com
```

### STep 2: Tag your Docker Image
```sh
docker tag <repo name>:v1 561243041928.dkr.ecr.eu-north-1.amazonaws.com/<repo name>:latest
```
### Step 3: Push your Docker Image to ECR
```sh
docker push 561243041928.dkr.ecr.eu-north-1.amazonaws.com/<repo name>:latest
```
10. Create Load Balancer
11. Create ECS
### Step 1: Create Task 
    - Fargate
        - name
        - Task Roll Conatiner required to access aws resources
        - Task Size
        - Add Conatiner
### Step 2: Cerate CLuster
        - Name:
### Step 3: Create Service

12. Create code commit
 - Create SSH Key
 ```
 ssh-keygen 
 ```
 - Copy id_rsa.pub into IAM user
 - Push index.html and Dockerfile to remote repo

13. Create Code Deploy
- Create buildspec.yaml
- Update docker image uri
```yaml
version: 0.2
run-as: root

phases:

  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION
     

  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...          
      - docker build -t web:1 .
      - docker tag web:1 $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/<ecr repo name:latest>

  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image...
      - docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/<ecr repo name:latest>
      - echo Push the latest image to cluster
```

14. Push buildspec.yaml to codecommit remote repo
15. Start code build

16. Get IAM role to allow codebuild to get ecr access 
- Attach Policy <AmazonEC2ContainerRegistryFUllAccess>

17. Start code build

18. Create Image definition json for code deploy

```json
[
  {
    "name": "<container name>",
    "imageUri": "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/<ecr repo name:latest>"
  }
]
```
19.  Push this file to code commit

20. Create code pipeline
- Code Deploy
  - Select ECS
  - Attach s3 access Policy to codepipeline role
  - Retry deploy stage in code pipeline
  - Update image definition.json file in deploy > Build Artifacts> Imagedefinition file

21. Create index file new version and push to code commit and your cicd is automated