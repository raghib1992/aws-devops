## Create Node exporter n linux machine to sends metircs to promethues
```sh
NODE_EXPORTER_VERSION="0.16.0"
wget https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz
tar -xzvf node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz
cd node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64
cp node_exporter /usr/local/bin

# create user
useradd --no-create-home --shell /bin/false node_exporter

chown node_exporter:node_exporter /usr/local/bin/node_exporter

echo '[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target' > /etc/systemd/system/node_exporter.service

# enable node_exporter in systemctl
systemctl daemon-reload
systemctl start node_exporter
systemctl enable node_exporter
```
## Configure prometheus to know about the linux target machine where node_exporter is setup.
```yml
echo "Setup complete"
Add the following lines to /etc/prometheus/prometheus.yml:
scrapes_configs:
  - job_name: 'node_exporter'
    scrape_interval: 5s
    scrape_timeout: 3s
    scheme: https
    metrics_path: /stats/metrics
    static_configs:
      - targets: ['localhost:9100']
```
#### scrape_configs:
1. How frequently to scrape targets from this job.
```yml
[ scrape_interval: <duration> | default = <global_config.scrape_interval> ]
```
2. Per scrape timeout when scraping this job.
```yml
[ scrape_timeout: < duration> | default = <global_config.scrape_timeout> ]
```
3. The HTTP resource path on which to fetch metrics from targets.
```yml
metrics_path: path | default = /metrics
```
4. Configures the protocol scheme used for requests.
```yml
[ scheme:<scheme> | default = http ]
```
5. Sets the `Authorization` header on every scrape request with the configured username and password. password and password_file are mutually  exclusive.
```yml
basic_auth:
    [ username: <string> ]
    [ password: <secret> ]
    [ password_file: <string> ]
```
## Restart Prometheus
- systemctl restart prometheus
- ctrl+c -> ./prometheus
- kill -HUP <pid>
