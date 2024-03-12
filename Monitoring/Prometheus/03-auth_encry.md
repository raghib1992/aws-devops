# Authentication & Encryption
### Create ssl key for encrytion
```
sudo openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout node_exporter.key -out node_exporter.crt -subj "/C=US/ST=California/L=Oakland/ O=MyOrg/CN=localhost" -addext "subjectAltName = DNS:localhost"
ls -l
```
### Create config file
```
vi config.yml

tls_server_config:
    cert_file: node_exporter.crt
    key_file: node_exporter.key
```
###  configure node_exporter target
```
sudo mkdir /etc/node_exporter
mv node_exporter.* /etc/node_exporter
sudo cp config.yml /etc/node_exporter
chown -R node_exporter:node_exporter /etc/node_exporter
```
### edit node_exporter service file
```
vi /etc/system/system/node_exporter.service

[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter --web.config=/etc/node_exporter/config.yml

[Install]
WantedBy=multi-user.target
```

### restart node exporter
```
 ./node_exporter --web.config=config.yml

systemctl daemon-reload
systemctl restart node_exporter
```
### test the url
```sh
curl -k https://localhost:9100/metrics
# -k option for insure connection as we using self sign crt
```

## Prometheus TLS Config
- Copy node_exporter.crt to Prometheus server
```
scp username:password@node:/etc/node_exporter/node_exporter.crt /etc/prometheus

chown prometheus:prometheus node_exporter.crt
```
- edit prometheus.yml file
```sh
vi /etc/prometheus/prometheus.yml

# ym lfile
scrape_configs:
  - job_name: "node"
    # change to https from http
    scheme: https
    tls_config:
    # add crt 
        ca_file: /etc/prometheus/node_exporter.crt
        insecure_skip_verify: true
    static_configs:
        - targets: ["192.168.1.168:9100"]
```
- Restart prometheus service
```
systemctl restart prometheus
```

## Prometheus Authentication
#### Generate Hash Password
- Install apache2-utils or httpd-tools
```
sudo apt install apache2-utils

htpasswd –nBC 12 "" | tr -d ':\n'
```
#### edit config file in node exporter
```
vi /etc/node_exporter/config.yml 

tls_server_config:
cert_file: node_exporter.crt
key_file: node_exporter.key
basic_auth_users:
prometheus: $2y$12$dCqkk9uah20wF
```
#### Restart service
```
systemctl restart node_exporter
```

### Auth Configuration
#### Prometheus Server will now show as Unauthorized
#### Edit prometheus yaml file
```sh
vi /etc/prometheus/prometheus.yml
```
```yml
- job_name: "node"
  scheme: https
  basic_auth:
    username: prometheus
    # plain text password
    password: password
```
#### Restart serice
```sh
systemctl restart prometheus
```