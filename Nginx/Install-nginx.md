# Install Nginx
*************************
## https://docs.google.com/document/d/1daWEkgwfxTAAEYw-42ZKAb6nV3CfLk66eoOS6ijzXgs/edit
*************************
# Web Server
## A web server is a program that uses HTTP (Hypertext Transfer Protocal) to serve the files that form web pages to users, in response to thier request.
## Other Webserver
### Apache, Nginx, IIS
**********************
# Nginx
## LINUX
## WINDOW (BETA-like)
## Docker
### Installing NGINX Open Source on amazon linux machine
### Nginxinstall from repo appstream
```
sudo amazon-linux-extras install nginx1
sudo systemctl start nginx
```
### To remove nginx
```
yum remove -y nginx1
```
### install using rpm
### Ref https://nginx.org/packages/
## directory where html file
```
/usr/share/nginx/html
```
## Nginx log all the logs in 
```
/var/log/access.log
```

## installing Nginx from official Nginx repos.
```
yum -y install wget
wget https://nginx.org/packages/centos/8/x86_64/RPMS/nginx-1.20.1-1.el8.ngx.x86_64.rpm
yum -y install nginx-1.20.1-1.el8.ngx.x86_64.rpm
systemctl start nginx
```