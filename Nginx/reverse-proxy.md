# Reverse Proxy Setup
## Step 1: Launch 3 Servers

### 1st - Nginx Reverse Proxy

### 2nd - Application Server

### 3rd - Authentication Server



## Step 2: Install Nginx using RPM Method

```
yum -y install wget
wget https://nginx.org/packages/centos/8/x86_64/RPMS/nginx-1.20.1-1.el8.ngx.x86_64.rpm
yum -y install nginx-1.20.1-1.el8.ngx.x86_64.rpm
systemctl start nginx
```

## Step 3: Installing net-tools

```
yum -y install net-tools
ifconfig
```


## Step 4: Adding contents to html file



### Admin Server:

```
cd /usr/share/nginx/html
echo "This is application server backend" > index.html
```

### Auth Server:
```
cd /usr/share/nginx/html
mkdir admin
echo "This is auth server file under admin" > index.html
```

### Disable SELinux:

```
getenforce
setenforce 0
```

## Final Configuration:

```
cd /etc/nginx/conf.d
nano proxy.conf
server {
    listen       80;
    server_name  localhost;
 
    location / {
        proxy_pass http://10.139.0.3;
    }
 
    location /admin {
        proxy_pass http://139.59.11.125;
      }
}
nginx -t
systemctl restart nginx
```
************************
# X-Real-IP Configuration

## Reverse Proxy Side

```
nano /etc/nginx/conf.d/proxy.conf
proxy_set_header X-Real-IP $remote_addr;
```

## Backend Server Side

```
nano /etc/nginx/nginx.conf
"$http_x_real_ip"
```
*************************
# Proxy Host Header

## Reverse Proxy Level
```
proxy_set_header Host $host
```

## Backend Server Level
```
yum -y install tcpdump
tcpdump -A -vvvv -s 9999 -i eth1 port 80 > /tmp/headers
```
********************************