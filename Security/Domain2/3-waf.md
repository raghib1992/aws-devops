# Web Application Firewall
## Firewall work on the layer 3 and layer 4 of the OSI model. Main aim of firewall is to block malicius and unauthorized plan


## WAF is an application level firewall for http, 
### generally define in owasp top 10 metrics. 
### open-source tools for waf is NAXSI, ModeSecurity, Signal Science, cloudflare


## WAF basic steps
1. web acl
- Web ACL centralized place that contains the rules, rule statement and associated configuration
2. Association in WAF
- Which entity waf is associated
- WAf cannot associated with ec2 instance directly
- ALB, cloudfront, AP gateway
3. Rules
- COmbine multiple rule statement into rules, with multiple statement can be AND, OR and NOT
- Regular rules and rate-based rule
4. Rule statements
- Basic characteristics that would be analyzed with a web request
    - Rate-based rule (combine regular rule  and ratelimiting features):
        - regular rule: if request comes from 172.10.54.99
        - If request exceed 1000 requests per 10 min
- custom define or aws provided rule statement
- Sample Rule: 
    - Block all request which is coming out from india
    - Block all request which has uri path of admin
```

## Create new web ACL
1. **Name**: demo-wacl
2. **Description**: For learning Purpose
3. **CloudWatch metric name**: Leave as default
4. **Resource type**: select any one
- Regional resources (Application Load Balancers, Amazon API Gateway REST APIs, AWS AppSync GraphQL APIs and Amazon Cognito user pools)
- Amazon CloudFront distributions
5. **Associated AWS resources - optional (0)**
4. Add rule
- Add my own rules and rule groups
## Aws based rule for sql

## Create custom responce
1. custom responce bodies
2. Create custom responce body
3. make your own responce
4. save
5. edit rules and enable custom responce
6. add responce code - 403
7. save

### sql injection for tst
```sql
http://waf-alb-78571994.eu-north-1.elb.amazonaws.com/products?category=courses%27+OR+1=1--
```