# Web Application Firewall
## Firewall work on the layer 3 and layer 4 of the OSI model. Main  ai of firewall is to block malicius and unauthorized plan
## WAF is an application level firewall for http, 
### generally define in owasp top 10 metrics. 
### open source NAxsi Modececurity

```
web acl --> association --> Rules --> Rule statements
```

# Create new web ACL
1. select region
2. Click on **Creat Web ACL**
3. select resource type 
    - Cloud front distribution
    - regional resources(api gateway, alb, aws appsync)
4. add rule


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