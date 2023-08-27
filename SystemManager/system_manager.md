## Install ssm agent into ec2
### ssm agent doesn't have permission to perform action on your instances, need to attach IAM role "AmazonSSMManagedInstanceCore"

1. Run Command
    - AWS- RUn Ansible Playbook
    - AWS-Configure Docker
    - AWS-Install Missing Window update
    - AWS-Run sheell script

2. Parameter Store
3. Session Manager
    - Install ssm agent
    - attach Role "AmazonSSMManagedInstanceCore"
    - port 22 not required
    - public IP not required
    - logging and auditing session
        - cloud watch looging should be enable to log what command has been run
        - Create cloudwatch log group
        - Enable cloudwatch logging in session manager
        - Attcah cloudwatch policy to ec2 IAM role

4. Patch manager
5. SSM Automation
TO perform multiple task
6. SSm INventory (open source spacewalk)
    - It capture various information like Names, Files, network, configuration, Instance details, window registry and others
    ### Setup ssm inventory
    - ec2 instance with ssm agent and IAM role
    - SSM -> Inventory -> setup 