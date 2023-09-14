a secutiry incident is any attempted or actual unauthorized access, use, discloser, modification, or destruction of information.

Incident responce is an organization approach to address and manage the aftermath of a security incident in an organization.

event driven secuirty
A detective mechanism is triggers a responsive mechanism to automatically remediate the events


Prevention is best cure
WAF, IAM, Network Firewall, KMS


detective controls
Cloudtrail, cloudwatch, Inspector, Detective


phase of incident responce
1. preparaton phase
- Ensure logging enable with the help of Cloudtrail, VPC FLowlogs, EC2 instances.
- using aws organization to separate aaccounts to reduce the blast surface

2. Detection phase
- Lots of aws console sign-in failure in past one hour
- if user is logging in 3 am in morning and lauching new server

3. Containment Phase
- use awscli to attach restricitve security gorup and remove earlier security group

4. Investigating Phase 
- CloudWatch logs to determine what occur inside server
- aws config to see infrastructure timeline to see if anything was changed

5. Recovery Phase
- Use prebuild AMI for the application to lauch new app server
