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

## Create new web ACL
1. **Name**: demo-waf
2. **Description**: For learning Purpose
3. **CloudWatch metric name**: Leave as default
4. **Resource type**: select any one
- Regional resources (Application Load Balancers, Amazon API Gateway REST APIs, AWS AppSync GraphQL APIs and Amazon Cognito user pools)
- Amazon CloudFront distributions
5. **Associated AWS resources - optional (0)**
4. Add rule
- Add my own rules and rule groups
- Create custom responce
       


### Rule for block source IP from spefic country
- Add Rule
    - Name
    - Type: Regular rule
    - If request: Not condition
    - Statement:
        - Inspect: Originates from a country
        - Country Codes
        - Select: SourceIP / IP in header
    - Action
        - Block



### Rule to block specific string in URI
- Add Rule
    - Name
    - Type: Regular rule
    - If request: Match condition
    - Statement:
        - Inspect: URI Path
        - Match Type: Contain string
        - String to Match: string wants to block eg. admin
    - Action
        - Block/Captcha

### Block sql injection in URI
- Add Rule
    - Add Managed rule
    - Aws managed rule
        - Enable SQL Database
    - save


```t
http://http://demo-waf-alb-1337700633.eu-north-1.elb.amazonaws.com//products?category=courses%27+OR+1=1--
```