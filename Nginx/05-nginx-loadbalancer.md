# Load Balancer Configuration
vi /etc/nginx/conf.d/load-balancer.conf
```
upstream backend {
  server 10.139.0.3;
  server 10.139.0.4;
}
 
server {
    listen       80;
    server_name  localhost;
 
    location / {
        proxy_pass http://backend;
 }
}
```