# Sticky Seesion
## For ALb
- targetgroup --> Edit Attribute --> Enable Sticky session

### curl header before stickey session
```
curl -I demo-alb-960556182.eu-north-1.elb.amazonaws.com

```
### curl header after stickey session
```
curl -I demo-alb-960556182.eu-north-1.elb.amazonaws.com
```