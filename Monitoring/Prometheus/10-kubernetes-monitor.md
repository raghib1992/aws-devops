# Monitor Kubernetes
- Monitor applications running on Kubernetes infrastructure
- Monitor Kubernetes Cluster
    - Control-Plane Components(api-server, coredns, kube-scheduler)
    - Kubelet(cAdvisor) – exposing container metrics
    - Kube-state-metrics – cluster level metrics(deployments, pod metrics)
    - Node-exporter – Run on all nodes for host related metrics(cpu, mem, network)

- To collect cluster level metrics(pods, deployments, etc) the kube-statemetrics container must be deployed
- Every host should run a node_exporter to expose cpu, memory, and network
stats. We can manually go in an install a node_exporter on every node. Better option is to use a Kubernetes daemonSet - pod that runs on every
node in the cluster

- Manually deploy Prometheus on Kubernetes – Create all the deployments, services, configMaps, and secrets Complex, requires a lot of configuration, not the easiest solution

- Best way to deploy Prometheus is using Helm chart to deploy Prometheus operator
1. Install helm
- link: *https://helm.sh/docs/intro/install/*

2. Add repo :The Kube-Prometheus-stack chart makes use of the Prometheus
Operator
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