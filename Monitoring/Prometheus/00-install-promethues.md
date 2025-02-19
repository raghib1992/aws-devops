# Install Prometheus
## Install on bare metal/VM
### Ref: *http://prometheus.io/download*
```sh
# Download binary
wget https://github.com/prometheus/prometheus/releases/download/v2.50.1/prometheus-2.50.1.linux-amd64.tar.gz
ls -l
tar -C /opt -xvf prometheus-2.50.1.linux-amd64.tar.gz
cd /opt
mv prometheus-2.50.1.linux-amd64 prometheus
cd prometheus
ls -l
sudo cp prometheus /usr/local/bin
sudo cp promtool /usr/local/bin

# Create user for prometheus and it does not login
sudo useradd --no-create-home --shell /bin/false prometheus
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus

# permission
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus

sudo cp -r consoles  /etc/prometheus
sudo cp -r console_libraries /etc/prometheus

#Permissions
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

sudo cp prometheus.yaml /etc/prometheus/prometheus.yml

#Permissions
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```
#### Create service file
```sh
sudo vi /etc/systemd/system/prometheus.service

# add below script
[Unit]
Description=Prometheus
Wants=network online.target
After=network online.target

[Service]
User=prometheus
Group prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target

# reload the service
sudo systemctl daemon reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
sudo systemctl status prometheus
```
### Open in localhost
```sh
http://localhost:9090
```
### Prometheus Is configured to monitor itself by default
```t
up 
# click on execute
```
### Reloading Configuration
- After making changes to the Prometheus confiigs, a reload of the configuration needs to take place for changes to take affect
1. Restart Prometheus
```
systemctl restart prometheus
```
2. Send a SIGHUP signal to the Prometheus process
```
sudo killall -HUP prometheus
```
3. Send a POST/PUT request to http://<prometheus>/-/reload
- This functionality not enabled by default
- Need to start prometheus with --web.enable-lifecycle flag
```t
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries \
    --web.enable-lifecycle   # This should be enable
[Install]
WantedBy=multi-user.target
```
## Run command 
```sh
sudo systemctl daemon-reload
sudo systemctl restart prometheus
curl -X POST http://<prometheus>/-/reload
```

## Install Prom on Ubuntu 20.04
```
sudo apt update -y
sudo apt install prometheus -y
systemctl status prometheus
systemctl status prometheus-node-exporter
```
********************************
## Nginx reverse Proxy
### Ref https://sbcode.net/prometheus/nginx-prometheus/

### enable ssl
### authentication


## Installing Prometheus using Helm
```sh
kubectl create namespace darwin

helm install prometheus prometheus-community/kube-prometheus-stack --namespace darwin
# To verify the installation, run the command:

kubectl get pods -n darwin
```
#### Port-Forwarding to access the Prometheus UI 
```sh
kubectl port-forward -n darwin prometheus-prometheus-0 9091:9090
# keep the port-forward running in the background
 
``` 