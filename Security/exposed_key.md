# Dealing with exposed key
### certain steps are recommended as part of the incident repsonse plan:
1. Determine the access associated with those keys.
- root user
- IAM uses: verify the policy attach with IAM user
2. Invalidating the credentials
- Disbaling the credentials is first steps and then delete it, if any prod env using that credetnials may be affected.
3. invalidating the temporary credentials issued with the exposed keys
- temp cred generated using access and secret keys, and these cred have lifetime 15 min to 36 hours
```sh
# Create temp credential for lifetime 15 min
aws sts get-session-token --duration-seconds 900
```
- To store this temp cred in aws cli as shot term
#### For that , add **Session Token**
```sh
# Create aws profile
aws configure --profile attacker
# Add access key and secret

# open file .aws in home directory
# add 
aws_session_token = 
```
- to remove the misuses of this temp cred, attach deny policy with the users
4. restore the access with newer credentials
5. review your aws cloudtrail logs