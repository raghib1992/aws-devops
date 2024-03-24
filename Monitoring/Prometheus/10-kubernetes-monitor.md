# Monitor Kubernetes
- Monitor applications running on Kubernetes infrastructure
- Monitor Kubernetes Cluster
    - Control-Plane Components(api-server, coredns, kube-scheduler)
    - Kubelet(cAdvisor) – exposing container metrics
    - Kube-state-metrics – cluster level metrics(deployments, pod metrics)
    - Node-exporter – Run on all nodes for host related metrics(cpu, mem, network)

- To collect cluster level metrics(pods, deployments, etc) the kube-state-metrics container must be deployed
- Every host should run a node_exporter to expose cpu, memory, and network
stats. We can manually go in an install a node_exporter on every node. Better option is to use a Kubernetes daemonSet - pod that runs on every
node in the cluster

- Manually deploy Prometheus on Kubernetes – Create all the deployments, services, configMaps, and secrets Complex, requires a lot of configuration, not the easiest solution

- Best way to deploy Prometheus is using Helm chart to deploy Prometheus operator
1. Install helm
- link: *https://helm.sh/docs/intro/install/*

2. Add repo :The Kube-Prometheus-stack chart makes use of the Prometheus Operator
- github link: *https://github.com/prometheus-operator/prometheus-operator*
```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

3. Update repo
```sh
helm repo update
```

4. Check values file 
```sh
helm show values prometheus-community/kube-prometheus-stack > values.yaml
```

5. Install prometheus
```sh
helm install prometheus prometheus-community/kube-prometheus-stack
# with custom values.yaml files
helm install prometheus prometheus-community/kube-prometheus-stack -f values.yml
```

- Connect to Prometheus Server
#### Method 1: Port forwarding
##### Step 1: Check the service for prometheus pod
```sh
kubectl get service

# Check the Port
kubectl get svc prometheus-kube-prometheus-prometheus -o yaml
```
##### Step 2: Check the pod name
```sh
kubectl get po
```
##### Step 3: Forward the Port
```sh
kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090
```

- Monitor Application
- Monitor App running on Kubernetes Using Additional Scrape
1. Get values.yaml file
```sh
helm show values prometheus-community/kube-prometheus-stack > values.yaml
```
2. Edit values fle
    - search for `AdditionalScrapeConfigs` in values.yaml file
    - Uncomment additionalScrapeConfig job name
3. Upgrade helm
```sh
helm upgrade prometheus prometheus-community/kube-prometheus-stack -f values.yaml
```

- Monitor App running on k8s using Service Monitor
```yml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: api-service-monitor
  labels:
    app: prometheus
    release: prometheus
spec:
  jobLabel: job
  endpoints:
    - interval: 30s
      port: web
      path: /swagger-stats/metrics
  selector:
    matchLabels:
      app: api
```
