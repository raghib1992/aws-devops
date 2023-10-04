## Basic HTTP header
http header let the client and server pass additional info with http request and response

Header
- Get
- Request Header
    - host
    - user-agent

## ALb
- function at application layer and support both http and https

## path based routing
- /svcA web-server1
1. service A runs an application on the path /svcA, and service B runs an application on path /svcB.
2. Create a target group
    - you register the EC2 instance that's running service A with target-group-A. For this target group, you can set HealthCheckProtocol as HTTP and HealthCheckPath as /svcA
3. Configure listener rules
    - Select the load balancer, and then choose Listeners.
    - To update the listener, choose View/edit rules.   
    - To add a path-based rule for /svcA, choose Add condition, Path, and then enter the path pattern /svcA/* or /health.html.
    - To add a forward action, choose Add action, Forward to, and then choose the target group target-group-A.
    - Choose Save.
    - Repeat the preceding steps for the path /svcB with the following changes:
    - For step 6, enter the path pattern /svcB/*.
    - For step 7, choose the target group target-group-B.

### Check GET Header in raw 

## server header based routing
raghib.click server1 and server2
raghib.in server3 and server4

## Create lister rule a per client tool
- if http header User-Agent is *curl*
- if http header User-Agent is *Mozilla*
- if http header User-Agent is *wget*

### You can create rule based on 
- Host header
- path
- http header
- http request method
- query string
- source ip

```
request --> ALB --> Listener --> Listener Rule --> Rule Action
```

## target Group
1. ec2
2. lambda