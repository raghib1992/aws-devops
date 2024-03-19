# Console Templates
- Console templates allow you to create your own custom html pages using Go templating language
- Prometheus metrics, queries and charts can be embedded in the templates
- templates are located at `ls /etc/prometheus/consoles`

### Custom console tempalte 
```html
{{template "head" .}}
{{template "prom_content_head" .}}

<h1>Node Stats</h1>
<h3>Memory</h3>
<strong>Memory utilization:</strong> {{template "prom_query_drilldown" (args "100- (node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100)" "%") }}
<br/>
<strong>Memory Size:</strong> {{template "prom_query_drilldown" (args "node_memory_MemTotal_bytes/1000000" "Mb") }}

<h3>CPU</h3>
<strong>CPU Count:</strong> {{template "prom_query_drilldown" (args "count(node_cpu_seconds_total{mode='idle'})") }}
<br/>
<strong>CPU Utilization:</strong>
{{template "prom_query_drilldown" (args "sum(rate(node_cpu_seconds_total{mode!='idle'}[2m]))*100/8" "%") }}

<div id="cpu"></div>
<script>
  new PromConsole.Graph({
    node: document.querySelector("#cpu"),
    expr: "sum(rate(node_cpu_seconds_total{mode!='idle'}[2m]))*100/2",
  });
</script>

<h3>Network</h3>
<div id="network"></div>

<script>
  new PromConsole.Graph({
    node: document.querySelector("#network"),
    expr: "rate(node_network_receive_bytes_total[2m])",
  });
</script>

{{template "prom_content_tail" .}}
{{template "tail"}}
```