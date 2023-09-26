# IAM
1. User
- By default user doesn't have any permission
2. Rules
3. Resource

## IAM POlicy
1. AWS managed policy
- An AWS managed policy is a standalone policy that is created and administered by AWS
- Standalone policy means that the policy has its own Amazon Resource Name (ARN) that includes the policy name. For example, arn:aws:iam::aws:policy/IAMReadOnlyAccess is an AWS managed policy
2. a customer managed policy
- You create these customer managed policies for your specific use cases, and you can change and update them as often as you like
3. or an inline policy
- An inline policy is a policy created for a single IAM identity (a user, group, or role). Inline policies maintain a strict one-to-one relationship between a policy and an identity. They are deleted when you delete the identity. You can create a policy and embed it in an identity, either when you create the identity or later. If a policy could apply to more than one entity, it’s better to use a managed policy.


# Identity and resource based policy
1. Identity based policy are attached to an IAM, Group and Roles
2. Resouce Based policy  are attached to resources


# Cross Account IAM Role
1. Create user in account A
- Create user in account A 
    - Name Bob
2. Create cros account role in account B
- Create Role
    - Role
    - Another Aws account: account A account ID
    - Attach policy
    - Generate a link to be used to switch account
3. Allow user(form account B) to switch to account B
- create inline policy
```json
{
    "Version": "2012-10-17",
    "Statement": {
        "Effect": "Allow",
        "Action": "sts:AssumeRole",
        "Resources": "Account-B-Cross-account-Role-ARN"
    }
}
```
