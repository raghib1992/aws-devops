# PromQL

- Short for Prometheus Query Language
- Main way to query metrics within Prometheus
- Data returned can be visualized in dashboards
- Used to build alerting rules to notify administrator


## Data Types
1. Instant Vector
- A set of time series contaning a single sample for each time series, all sharing the same timestamp
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
- Multiple selector
    - `node_filesystem_avail_bytes{instance=“node1”, device!=“tmpfs”}`
- Range Vector Selectors
    - Returns all the values for a metric over a period of time
    - Ex `node_arp_entries{instance=“node1”}[2m]`

## Modifiers
- When performing a query, it returns the current value of a metric, To get historic data use an offset modifier after the label matching
- Ex 
    - `node_memory_Active_bytes{instance=“node1”} offset 5m`
    - `node_memory_Active_bytes{instance=“node1”} offset 2w`
    - `node_memory_Active_bytes{instance=“node1”} offset 1h30m`

- ms = millisecond
- s = seconds
- m = Minutes
- h = Hours
- d = Days
- w = Weeks
- y = years, which have 365 days

- To go back to a specific point in time use the @ modifier, use unix  timestamp
- Ex `node_memory_Active_bytes{instance="node1"} @1663265188` 

- The offset modifier can be combined with the @ modifier
- Ex `node_memory_Active_bytes{instance="node1"} @1663265188 offset 5m`

- The offset and @ modifier also work with range vectors
- Ex ` node_memory_Active_bytes{instance="node1"}[2m] @1663265188 offset 10m`


## Operator
1. Binary Operator
- Binary operator are the operator that take two operands and performs the specified calculation on them.
- When an PromQL expression has multiple binary operators, they
follow an order of precedence, from highest to lowest:
1. ^
2. *, /, %, atan2
3. +, -
4. ==, !=, <=, <, >=, >
5. and, unless
6. or
- Operators on the same precedence level are left-associative.
- Example: 2 * 3 % 2 is equivalent to (2 * 3) % 2
- However ^ is right associative, so 2 ^ 3 ^ 2 is equivalent to 2 ^ (3 ^ 2)

    - Arithmetic binary operator
        - +, -, *, /, %, ^
        - Define between scalar/scalar, vector/scalar, vector/vector
        - Example: 
            - `node_memory_Active_bytes/8`
            - `node_memory_Active_bytes{instance="node1"} + 10`

    - Comparision binary operator
        - ==(equal), !=(not equal), > (greater-than), <(less-than), >=(grater-or-equal) <=(less-or-equal)
        - Define between scalar/scalar, vector/scalar, vector/vector
        - Ex: 
            - `process_open_fds > 12`
            - `node_network_receive_packets_total >= 220`
        - Bool Operator can be used to return a true(1) or false(0) result   
            - `node_filesystem_avail_bytes < bool 1000`


    - Logical/Set binary operator
        - and(intersection), or(union), unless(complement)
        - Define between instant vectord only.
        - Ex: Return all time series greater than 1000 and less than 3000
        ```
        node_filesystem_avail_bytes > 1000 and node_filesystem_avail_bytes < 3000
        ```
        - Ex: Return all time series less than 500 or greater than 70000
        ```
        node_filesystem_avail_bytes < 500 or node_filesystem_avail_bytes > 70000
        ```
        - Unless operator results in a vector consisting of elements on the left side for which there are no elements on the right side
        - Ex: Return all vectors greater than 1000 unless they are greater than 30000
        ```
        node_filesystem_avail_bytes{instance=“node1", job="node", mountpoint="/var"}  1771
        node_filesystem_avail_bytes{instance=“node1", job="node", mountpoint="/home"}  2872
        ``` 

  
## Aggregation Operator
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
- Example: 
    - `sum(prometheus_http_requests_total) by (code)`
    - `topk(3, sum(node_cpu_seconds_total) by (mode))`
    - `bottomk(3, sum(node_cpu_seconds_total) by (mode))`
    - `max(node_cpu_seconds_total)`
    - `sum by(instance) (http_requests)`
    - `sum by(instance, method) (http_requests)`
- The without keyword does the opposite of by and tells the query which labels not to  include in the aggregation
    - `sum without(path) (http_requests)`


## vector Matching
- Operators between and instant vectors and scalars
```
node_filesystem_avail_bytes < 1000
```
- Operators between and 2 instant vectors
    - One to one
    ```
    node_filesystem_avail_bytes / node_filesystem_size_bytes * 100
    ```
    - One to Many
    ```
    http_errors + on(path) group_left http_requests
    http_requests + on(path) group_right http_requests
    ```
- labels
    - Samples with exactly the same labels get matched together
    - Ignoring keyword can be used to “ignore” labels to ensure there is a match between 2 vectors
    ```
    http_errors{code="500”} / ignoring(code) http_requests
    ```
    - List of all labels to match on
    ```
    http_errors{code="500"} / on(method) http_requests
    ```

## Function


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

echo "node_filesystem_files{job=\"web\"} > 1000" > /root/query1.txt
echo "node_filesystem_avail_bytes{job=\"web\"} > 1000" > /root/query1.txt

echo "node_filesystem_files > 500000 and node_filesystem_files < 10000000" > /root/query3.txt