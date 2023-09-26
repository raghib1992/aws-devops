# aws organization
- When an invited account joins your organization, you do not automatically have full administrator control over the account, unlike created accounts. If you want the management account to have full administrative control over an invited member account, you must create the OrganizationAccountAccessRole IAM role in the member account and grant permission to the management account to assume the role
```
https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_access.html#orgs_manage_accounts_create-cross-account-role
```
1. Policies
- enable to apply additional types of management to the aws account in your organization
2. Consildate billing
- management account to access the billing information and pay for all member account
# Creat aws organization
```
https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html
```
# organization unit
- group of account to attach policies, it apply to all account of OU 