# IAM
1. User
    - By default user doesn't have any permission
2. Rules
3. Resource

## IAM POlicy
# Identity and resource based policy
- **Identity-based policies** are permissions policies that you attach to an IAM identity, such as an IAM user, group, or role.
Identity-based policies can be further categorized:
    1. **AWS managed policy**
    - An AWS managed policy is a standalone policy that is created and administered by AWS
    - You cannot change the permissions defined in AWS managed policies.
    - **Standalone policy**
    -It means that the policy has its own Amazon Resource Name (ARN) that includes the policy name. For example, arn:aws:iam::aws:policy/IAMReadOnlyAccess is an AWS managed policy
    2. **Customer managed policy**
    - You create these customer managed policies for your specific use cases, and you can change and update them as often as you like
    - **Create Custom POlicy and attached to IAM user**
        - Step 1: Create the policy
        - Step 2: Attach the policy
        - Step 3: Test user access

    3. **Inline policy**
    - An inline policy is a policy created for a single IAM identity (a user, group, or role). Inline policies maintain a strict one-to-one relationship between a policy and an identity. They are deleted when you delete the identity. You can create a policy and embed it in an identity, either when you create the identity or later. If a policy could apply to more than one entity, it’s better to use a managed policy
-  **Resource-based policies** are permissions policies that you attach to a resource such as an Amazon S3 bucket or an IAM role trust policy.
- Resource-based policies are inline policies, and there are no managed resource-based policies. To enable cross-account access, you can specify an entire account or IAM entities in another account as the principal in a resource-based policy.
.
### Cli command to create iam policy
```sh
aws iam create-policy --policy-name AllowExternalDNSUpdates --policy-document file://external-dns-policy.json


```

# Element in IAM Policy
1. version
2. Statement
3. Effect
4. Action
5. Resources
6. Principal
- Specify things like IAM user, federated user, IAM ROle, aws account, aws services and etc
- You cannot use principal element in an IAM identity based policy
```json
"Principal": {"AWS":"arn:aws:iam::account-id:root"}
```



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


# Secure Token Service (STS)
### Credential Manager
### Provide temporary credential expire after short term duration
### sts cli command
### Ref https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sts/index.html
### Fetch STS Token for same account
```sh
aws sts get-session-token --duration-seconds 1800
# duration seconds range from 900 seconds (15 minutes) to 129,600 seconds (36 hours), with 43,200 seconds (12 hours) as the default
```

### Fetch STS Token from Cross account
1. Create Role in Account B
- Role for another - aws account A
- Attach POlicy
2. From Account A, assume role of cross account
```sh
aws sts assume-role --role-arn arn:aws:iam::566881612178:role/umber-clound_sankalan_cross_account_role --role-session-name tmp
```
3. Update the access, secret and token awscli profile