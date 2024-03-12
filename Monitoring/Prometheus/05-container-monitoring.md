# Monitoring Containers
- Metrics can also be scraped from containerized environments
- Docker Engine Metrics
- Container metrics using cAdvisor

### Docker Engine metrics
    - ✓ How much cpu does docker use
    - ✓ Total number of failed image builds
    - ✓ Time to process container actions
    - ✓ No metrics specific to a container
- Edit docker daemon json file
```
vi /etc/docker/daemon.json
```
```json
{
"metrics-addr" : "127.0.0.1:9323",
"experimental" : true
}
```
- restart docker daemon
```sh
sudo systemctl restart docker 
```
- curl metrics
```sh
curl localhost:9323/metrics
```
- add job in prometheus yaml file
```yml
scrape_configs:
    - job_name: "docker"
      static_configs:
        - targets: ["<ip-docker-host>:9323"]
```
### cAdvisor Metrics
    - ✓ How much cpu/mem does each container use
    - ✓ Number of processes running inside a container
    - ✓ Container uptime
    - ✓ Metrics on a per container basis
- create docker compase file
```
vi docker-compose.yml
```
```yml
version: '3.4'
services:
    cadvisor:
        image: gcr.io/cadvisor/cadvisor
        container_name: cadvisor
        privileged: true
        devices:
        - "/dev/kmsg:/dev/kmsg"
        volumes:
            - /:/rootfs:ro
            - /var/run:/var/run:ro
            - /sys:/sys:ro
            - /var/lib/docker/:/var/lib/docker:ro
            - /dev/disk/:/dev/disk:ro
        ports:
            - 8080:8080
```
- Create docker conatiner 
```sh
docker-compose up
```
- curl metric
```sh
curl localhost:8080/metrics
```
- add job in prometheus yaml file
```yml
scrape_configs:
    - job_name: "cAdvisor"
      static_configs:
        - targets: ["<ip-docker-host>:8080"]
```