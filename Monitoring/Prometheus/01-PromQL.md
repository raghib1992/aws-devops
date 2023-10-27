# PromQL
## Data Types
1. Instant Vector
- A set of time series contaning a single sample for each time series, alllsharing the same timestamp
2. Range Vector
- A set of time series contaning a range of data points over time for each time series.
- Adding [1m] i.e time duration, in end of metrics
ex: `rate(prometheus_http_requests_total[1m])`
    `rate(prometheus_http_requests_total{handler=~"/api.*"}[1m])`
3. Scalar
- A simple numeric floating value.
4. String
- A simple string value; currently unused.

## Selectors and Matchers
- Narrow the time series by filtering out using labels
```
<metric>{job='node_exporter'}
process_cpu_seconds_total{job='node_exporter', instance='localhost:8080'}
```
- Types of Matchers
    - Equality matcher (=): 
        - Select labels that are exactly equals to the provided string
        - Ex: `process_cpu_seconds_total{job='node_exporter'}`
    - Negative Equality macther (!=):
        - Select labels that are not equal to the provided string
        - Ex: `process_cpu_seconds_total{job!='node_exporter'}`
    - Regular expression matcher (=~):
        - Select labels taht regex-match with the provided string
        - Ex: `prometheus_http_requests_total{handler=~"/api.*"}`
    - Negative Regular expression matcher (!~):
        - Select labels taht do not regex-match with the provided string
        - Ex: `prometheus_http_requests_total{handler!~"/api.*"}`

## Operator
1. Binary Operator
- Binary operator are the operator that take two operands and performs the specified calculation on them.
    - Arithmetic binary operator
        - +, -, *, /, %, ^
        - Define between scalar/scalar, vector/scalar, vector/vector
        - Example: `node_memory_Active_bytes/8`
    - Comparision binary operator
        - ==(equal), !=(not equal), > (greater-than), <(less-than), >=(grater-or-equal) <=(less-or-equal)
        - Define between scalar/scalar, vector/scalar, vector/vector
        - Ex: `process_open_fds>12`
    - Logical/Set binary operator
        - and(intersection), or(union), unless(complement)
        - Define between instant vectord only.
- Aggregation Operator
    - Special mathematics functions that are used to combine information.
    - Ref *https://prometheus.io/docs/prometheus/latest/querying/operators/*
    ```
    sum (calculate sum over dimensions)
    min (select minimum over dimensions)
    max (select maximum over dimensions)
    avg (calculate the average over dimensions)
    group (all values in the resulting vector are 1)
    stddev (calculate population standard deviation over dimensions)
    stdvar (calculate population standard variance over dimensions)
    count (count number of elements in the vector)
    count_values (count number of elements with the same value)
    bottomk (smallest k elements by sample value)
    topk (largest k elements by sample value)
    quantile (calculate φ-quantile (0 ≤ φ ≤ 1) over dimensions)
    ```
    - Example: `sum(prometheus_http_requests_total) by (code)`
    - Example: `topk(3, sum(node_cpu_seconds_total) by (mode))`
    - Example: `bottomk(3, sum(node_cpu_seconds_total) by (mode))`
    - Ex: `max(node_cpu_seconds_total)`

## rate 
- calculate the per-seconds average rate of increase of the time series in the range vector
- outputs the rate at which particular counter is increasing
- Ex: `rate(prometheus_http_requests_total[1m])`
    `rate(prometheus_http_requests_total{handler=~"/api.*"}[1m])`

## irate
- Calculate the instant rate of increase of the time series in the range vector
- Ex: `irate(prometheus_http_requests_total[1m])`

## Changes()
- Ex: `changes(process_start_time_seconds{job='node_exporter'}[1h])`

## deriv()
- Ex: `deriv(process_resident_memory_bytes{job='node_exporter'}[1h])`

## predict()
- Predicts the value of time series t seconds from now, based on the range vector v
- Ex: `predict_linear(node_memory_MemFree_bytes{job="node_exporter"}[1h],2*60*60)/1024/1024`

## over_time
- Ex: `max_over_time(node_cpu_seconds_total[1h])`
- Ex: `min_over_time(node_cpu_seconds_total[1h])`
- Ex: `avg_over_time(node_cpu_seconds_total[1h])`

## sort()
- Ex: `sort(node_cpu_seconds_total)`
- Ex: `sort_desc(node_cpu_seconds_total)`

## Date and time
- Ex: `time - process_start_time_seconds{job="node_exporter"}`
- Ex: `day_of_week()`
- Ex: `day_of_month`

### Link for details function 
- *https://prometheus.io/docs/prometheus/latest/querying/functions/*