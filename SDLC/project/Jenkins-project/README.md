# Tutorial: Create a four-stage pipeline


# Step 1: Complete prerequisites
1. install the CodePipeline Plugin for Jenkins
2. dedicated IAM user or role to use for permissions between your Jenkins project and CodePipeline
3. Install Jenkins on an EC2 instance that uses an IAM instance role that you create for Jenkins integration
4. you must configure proxy and firewall settings on the server or EC2 instance to allow inbound connections to the port used by your Jenkins project


# Copy or clone the sample into a GitHub repository
### https://github.com/raghib1992/aws-codepipeline-jenkins-aws-codedeploy_linux.git

# Create an IAM role to use for Jenkins integration
1. Under Select type of trusted entity, choose AWS service. Under Choose the service that will use this role, choose EC2. Under Select your use case, choose EC2
2. Choose Next: Permissions. On the Attach permissions policies page, select the AWSCodePipelineCustomActionAccess managed policy, and then choose Next: Tags. Choose Next: Review.
3. On the Review page, in Role name, enter the name of the role to create specifically for Jenkins integration (for example, JenkinsAccess), and then choose Create role

# Install and configure Jenkins and the CodePipeline Plugin for Jenkins
1. Install Jenkins on the EC2 instance. 
2. On the Manage Jenkins page, choose Manage Plugins
3. Choose the Available tab, and in the Filter search box, enter AWS CodePipeline. Choose CodePipeline Plugin for Jenkins from the list and choose Download now and install after restart
4. On the main page, choose New Item.
5. In Item Name, enter a name for the Jenkins project (for example, MyDemoProject). Choose Freestyle project, and then choose OK
6. On the configuration page for the project, select the Execute concurrent builds if necessary check box. In Source Code Management, choose AWS CodePipeline. If you have installed Jenkins on an EC2 instance and configured the AWS CLI with the profile for the IAM user you created for integration between CodePipeline and Jenkins, leave all of the other fields empty
7. Choose Advanced, and in Provider, enter a name for the provider of the action as it will appear in CodePipeline (for example, MyJenkinsProviderName). Make sure that this name is unique and easy to remember. You will use it when you add a build action to your pipeline later in this tutorial, and again when you add a test action.
8. In Build Triggers, clear any check boxes, and then select Poll SCM. In Schedule, enter five asterisks separated by spaces, as follows:
```sh
# This polls CodePipeline every minute.
* * * * *
```
9. In Build, choose Add build step. Choose Execute shell (Amazon Linux, RHEL, or Ubuntu Server) Execute batch command (Windows Server), and then enter the following:
```sh
rake
```
10. Choose Add post-build action, and then choose AWS CodePipeline Publisher. Choose Add, and in Build Output Locations, leave the location blank. This configuration is the default. It will create a compressed file at the end of the build process.
11. Choose Save to save your Jenkins project.

# Step 2: Create a pipeline in CodePipeline
1. On the Step 1: Choose pipeline settings page, in Pipeline name, enter the name for your pipeline.
2. In Service role, choose New service role to allow CodePipeline to create a service role in IAM.
3. Leave the settings under Advanced settings at their defaults, and choose Next.
4. On the Step 2: Add source stage page, in Source provider, choose GitHub.
5. Under Connection, choose an existing connection or create a new one. To create or manage a connection for your GitHub source action, see GitHub connections.
6. In Step 3: Add build stage, choose Add Jenkins. In Provider name, enter the name of the action you provided in the CodePipeline Plugin for Jenkins (for example MyJenkinsProviderName). This name must exactly match the name in the CodePipeline Plugin for Jenkins. In Server URL, enter the URL of the EC2 instance where Jenkins is installed. In Project name, enter the name of the project you created in Jenkins, such as MyDemoProject, and then choose Next.
7. In Step 4: Add deploy stage, reuse the CodeDeploy application and deployment group you created in Tutorial: Create a simple pipeline (S3 bucket). In Deploy provider, choose CodeDeploy. In Application name, enter CodePipelineDemoApplication, or choose the refresh button, and then choose the application name from the list. In Deployment group, enter CodePipelineDemoFleet, or choose it from the list, and then choose Next.
8. In Step 5: Review, review the information, and then choose Create pipeline.
9. The pipeline automatically starts and runs the sample through the pipeline. You can view progress and success and failure messages as the pipeline builds the Haml sample to HTML and deploys it a webpage to each of the Amazon EC2 instances in the CodeDeploy deployment