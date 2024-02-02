# LDAP
- Microsoft Active Directory
- RedHat Identity Managemnt / FreeIPA

# Basic Of Federation - AWS Prospective
- Federated users don't have permanent identities in your AWS account the way that IAM users do. To assign permissions to federated users, you can create an entity referred to as a role and define permissions for the role. When a federated user signs in to AWS, the user is associated with the role and is granted the permissions that are defined in the role
- Federation allow ext. identities (Federal User) to have secure access in your aws account without having to create any IAM User
- External identies come from
    - Corporate Identity Provider (AD, IPA)
    - Web Indentity provider (Facebook, Google, Cognito or Open ID)
- Identity Broker
    - It is an intermediate service  which connect multiple providers
    1. User sign in identity broker
    2. Identity Broker authenticate the user by identity Provider (AD)
    3. Once authentication is successful, Identity broker call aws sts and provide the token to user to access aws
    4. User use this token to connect to aws


## Basic Workflow
### User--> Service Providder --> Identity Provider-->User
