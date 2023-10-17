# CI pipeline in aws for Java project
### Using- Codecommit, Code Artifacts, Code pipeline, Sonar cloud, 

1. Create Repo in Codecommit
- **Name:** vprofile-code-repo
- Configure ssh method to access repo locally
    - IAM User
        - Create IAM Role
        - Attach policy
            - service: codecommit
            - Action: All
            - Resources: ARN of vprofile-code-repo
            - **Name:** vprofile-code-admin-repo-fullaccess
        - Create IAM USer
            - Attach policy
            - **NAME:** vprofile-code-admin
        - SSH Keys for AWS CodeCommit
            - Generate ssh key in local machine
            ```
            ssh-keygen -f vprofie
            ```        
            - Upload public key in aws IAM user
            - Now copy the access key and secret
            - Create ssh config file in local machine
            ```
            vi config
            
            Host git-codecommit.*.amazonaws.com
                User <ssh access key>
                IdentityFile <./vprofile>
            ``` 
            - config file permission 600
            - test
            ```t
            ssh git-codecommit.eu-north-1.amazonaws.com
            ## For troubleshooting
            ssh -v git-codecommit.eu-north-1.amazonaws.com
            ```
            - clone the vprofile-code-repo
            ```
            git clone <.url>
            ```
            - Transit github repo into codecommit repo
                - Switch to github repo
                ```
                cat .git/config
                ```
                - List all branch remote and local
                ```
                git branch -a
                ```
                - Checkout to the branch you want to push to code commit
                ```
                git chekcout master
                ```
                - get all brnaches in list in a file
                ```
                git branch -a | grep -v HEAD | cut -d '/' -f3 | grep -v master > /tmp/branches 
                ```
                - checkout all branches
                ```
                for i in `cat /tmp/branches`;do git checkout $i; done
                ```
                - fetch all tags
                ```
                git fetch --tags
                ```
                - remove remote repio
                ```
                git remote rm origin
                ```
                - add codecommit remiote repo
                ```
                git remote add origin <url>
                ```
                - check .git/config file
                ```
                cat .git/config
                ```
                - push all changes
                ```
                git push origin --all
                git push --tags
                ```
2. Create code artifatcs
- **Name:**     
- Public upstrream repo: maven-central-store
- aws account: this account
- domain: visualpath
### View Connection
- Select package manager: mvn
- Create User
    - Name: vprofile-cart-admin
    - Policy
        - awsCodeArtifactAdminAccess 
- configure awscli
```t
aws configure --profile vprofile
```  
- Get Token (Get command from vmaven-central-repo)
- go to vprofile repo
- switch to ci-aws branch
- Modify settings.xml file
```
change repo <url/>
change mirror 
```
- push changes to codecommit

3. Create Sonar cloud for code analysi
- Login to sonrcloud
    - *https://sonarcloud.io/login*
- generate a token
    - User->MyAccount -> Security
    - Token Name: vprofile-sonar-cloud
- Analyze New Project
    - Create Project Manually
    - Select Organization: raghib1992
    - Project Key: vprofile-raghib
    - Display Name: vprofile-raghib
    - setup

4. Create SSM Parameter
- SSM -> Paramter Store
    1) 
    - Name: Organization
    - Type: string
    - Data type: text
    - Value: raghib1992
    2) 
    - Name: HOST
    - Type: string
    - Data type: text
    - Value: https://sonarcloud.io
    3) 
    - Name: Project
    - Type: string
    - Data type: text
    - Value: vprofile-raghib
    4) 
    - Name: sonartoken
    - Type: securestring
    - Data type: text
    - Value: <sonar token>
    5) 
    - Name: codeartifact-token
    - Type: securestring
    - Data type: text
    - Value: <codeartifact token>

5. CodeBuild to build Project
- Sonar Code Analysis
    - Name: vprofile-build-sonar
    - SOurce: codecommit
    - Repo: vprofile-code-repo
    - Branch: ci-aws
    - OS: Ubuntu
    - Runtime: Standard
    - Image: Standard3.0 
    - ServiceROle: (it will created)
    - update buildspec.yml file (get updated file from aws-files/sonar_buildspec.yml)
    - Cloudwatch log group Name: vprofile-sonar-buildlogs
    - Stream Name: sonarbuildjob
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
- Build Artifacts
    - Name: vprofile-build-artifacts
    - SOurce: codecommit
    - Repo: vprofile-code-repo
    - Branch: ci-aws
    - OS: Amazon-Linux-2
    - Runtime: Standard
    - Image: Standard3.0 
    - ServiceROle: (it will created)
    - update buildspec.yml file (get updated file from aws-files/build_buildspec.yml)
    - Cloudwatch log group Name: vprofile-artifact-buildlogs
    - Stream Name: artifactbuildjob
    - Modify the service role to give it access of paramter store
        - Get role name edit env
        - IAM ROLE
        - Attach Policy
            - Name: vprofile-sonar-para-access
    - Start Build
6. Create SNS TOPic
- Name: vprofile-pipeline-notification
- Create subscription
    - email

7. Create codepipeline
- Name: vprofile-ci-pipeline
- Service Role: create new role
- Source Provider
    - source: COdecommit
    - repo: vprofile-code-repo
    - branch: ci-aws
    - Change detection option: cloudwatch
- Build provider
    - aws codebuild
    - region Stockholm
    - project name: vprofile-build-artifact
- skip deploy stage
- create pipeline

8. Edit Codepipeline
- Add stage before build
    - stage name: Test
    - Add action group 
        - name: sonar-code-analysis
        - provider: codebuild
        - region: stockholm
        - input artifact: source artifact 
        - project name: vprofile-build-sonar
        - build type: single 
- Add stage after build artifact
    - stage name: Deploy
        - name: deploy-to-s3
        - action provider: amazon s3
        - region: stockholm
        - input artifacts: build artifacts
        - bucket name: 
        - object key: pipeline-artifacts
- Settings -> Notification 
    - create notificatio rule
        - name: vprofile-ci-pipeline-notification
        - type: full
        - action
        - target: sns topic
- run pipeline

### Create Quality gates on SonarCloud
- Quality Gates
- Name: vprofile-qualitygate
- AddCondition
    - On Overall Codes
    - bugs Value 40
- Go to project
- Administrator
- Quality Gates
    - Select vprofile-qualitygate instead og default