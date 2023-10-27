# Reload COnfiguration without killing the prometheus service
1. SIGHUP signal
- Modify prometheus config file
- deteremine prometheus process id
```sh
ps aux | grep prometheus
```
- Kill the process
```
kill -HUP <PID>
```
- relaod with new configutaion
```
journalctl -n100
```

2. Post request to reload handler
- lifecycle API enables
./prometheus --web.enable-lifecycle
- sending http post
```
curl -X POST http://localhost:9090/-/reload
```
************************
# Naming Recording Rules
## Rescording rules should be of the general form `level:metric:operation`
### **Level:** level represents the aggregation level of the metric and lables of the rule output
### **Metric:** metric is just the same name under evaluation
### **Operations:** Operation is a list of operation that were applied to the metric under evalution. Newest operation come first.

### ex: `job:node_cpu_seconds:avg_idle`
***************************
# Recording Rules
### Create Rules file in yaml
```yaml
groups:
    - name: my-rules
      rules:
      - record: job:node_cpu_seconds:avg_idle
        # Create rule for av time of all cpu spend in idle mode
        # check metrics firdt
        # `avg without(cpu)(rate(node_cpu_seconds_total{mode="idle"}[5m]))`
        expr: avg without(cpu)(rate(node_cpu_seconds_total{mode="idle"}[5m]))
```
### Update prometheus config file
```yml
rule_files:
    - "rules/myrules.yml"
```
### reload prometheus
***************
# Add Mulitple Rules
```yml
groups:
    - name: my-rules
      rules:
      - record: job:node_cpu_seconds:avg_idle
        expr: avg without(cpu)(rate(node_cpu_seconds_total{mode="idle"}[5m]))
      - record: job:node_cpu_seconds:avg_not_idle
        expr: avg without(cpu)(rate(node_cpu_seconds_total{mode!="idle"}[5m]))
    - name: my-rules-new
      rules:
      - record: job:node_cpu_seconds:avg_idle_new
        expr: avg without(cpu)(rate(node_cpu_seconds_total{mode="idle"}[5m]))
```
