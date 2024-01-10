1. Create aws code commit
- Enter **wildrydes-site** for the Repository name
Once repository is created, set up an IAM user with Git credentials
- clone repo to local system
2. Copy content
cd wildrydes-site
aws s3 cp s3://wildrydes-us-east-1/WebApplication/1_StaticWebHosting/website ./ --recursive
push to remote repo
3. enable web hosting with the ampilfy console
Launch the AWS Amplify console. 
Choose Get Started. 
Under the Amplify Hosting Host your web app header, choose Get Started. 
On the Get started with Amplify Hosting page, select AWS CodeCommit and choose Continue.
On the Add repository branch step, select wildrydes-site from the Select a repository dropdown.
If you used GitHub, you'll need to authorize AWS Amplify to your GitHub account.
In the Branch dropdown select master and choose Next. 
Add repository branch
    8. On the Build settings page, leave all the defaults, select Allow AWS Amplify to automatically deploy all files hosted in your project root directory and choose Next.

    9. On the Review page select Save and deploy.

    10. The process takes a couple of minutes for Amplify Console to create the necessary resources and to deploy your code.
Once completed, select the site image, or the link underneath the thumbnail to launch your Wild Rydes site. If you select the link for master you'll see the build and deployment details related to your branch. 
