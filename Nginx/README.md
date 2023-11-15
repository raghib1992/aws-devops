# Nginx
1. Reverse Proxy
2. Load Balancer
3. Web-application Firewall

# Nginx details
- html Path
    - */usr/share/nginx/html/*
- Logs Files: */var/log*
    - Logs related to HTTP request
        - */var/log/access.log*

# Web Server
- A web server is a program that uses HTTP (Hypertest Transfer Protocol) to serve the files that form web pages to users, in response to their requests
- Many popular web server are like Apach, Nginx, IIS

# Install Of Nginx
- REF: *https://docs.google.com/document/d/1daWEkgwfxTAAEYw-42ZKAb6nV3CfLk66eoOS6ijzXgs/edit*
- LINUX
- WINDOW (BETA-like)
- Docker
- Installing NGINX Open Source on amazon linux machine
```sh
sudo amazon-linux-extras install nginx1
sudo systemctl start nginx
```
- Nginx install from repo appstream