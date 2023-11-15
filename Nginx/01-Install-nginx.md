# Install Nginx
- launch ec2 
    - using AMI: rockylinux
    - server type: t3.samll
    - allow port 22 and 80
- Install nginx
```sh
yum install -y ngnix
# Check version
nginx -v
# Check status
systemctl status nginx
```
- **Install Nginx from official repos.**
- REF: *https://nginx.org/packages/*

```sh
yum -y install wget
wget https://nginx.org/packages/centos/8/x86_64/RPMS/nginx-1.20.1-1.el8.ngx.x86_64.rpm
yum -y install nginx-1.20.1-1.el8.ngx.x86_64.rpm
systemctl start nginx
```