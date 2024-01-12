command to increase cpu utilization
```
dd if=/dev/zero of=/dev/null
```
command to check cpu utilization
```
top
```
To find out the number of CPU cores, run:
```
nproc
```
# Types of scaling
1. Scheduled Scaling
2. Dynamic Scaling
- Target tracking scaling
- Step Scaling
- Simple Scaling
3. Predective Scaling

Concpet
- Minimum, Maximum, Desire Instances

Launch Template/Configuration
- AMI ID
- Security group 
- Instance Type
- Key Pair
- Recommended to use launch template

Health Check
- EC2
- ELB