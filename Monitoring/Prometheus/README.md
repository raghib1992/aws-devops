# Prometheus
## Install Prometheus
- Install on ubuntu machine using prometheus.sh script
- Steps
    - Download Link *https://prometheus.io/download/*
    - untar the file
    ```
    tar -xvf <filename>
    ```
    - Install
    ```
    cd prometheus/prometheus
    ```

## Install Grafana
- Install on ubuntu machine using grafana.sh script
- Login using username: admin, password: admin
## Create DataSource
- Home -> Connection -> Data Source -> Add Data Source
- Prometheus


## Configuration Prometheus
- Check PID and conf details
```
ps aux | grep prometheus
```

- Config file located at */etc/prometheus/prometheus.yml*


# Get node-exporter to get linux details
- Install node-exporter.sh
- Modify prometheus.yml file
- reload config
```
systemctl reload prometheus
```
- If fail
```sh
#Get PID
ps aux | grep prometheus
# Kill the process
kil -HUP <PID>
# reload
journalctl -n100
```
- Check on UI-Target
### OR
- Download Link *https://prometheus.io/download/#node_exporter*
- untar filre
- run binary
- modify prometheus yaml file
- restart prometheus
## Get wni-exporter to get window details
- Connect to window server
- 