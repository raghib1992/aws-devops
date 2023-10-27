# Metric Types
1. Counter
- Sinle monotonically increase counter whose value can only increase or it can be reset on restart
- Counter are only one main mthod: inc() that increase the counter value by one
- DOn not use the value the counter to exopse a value that can decrease
2. Gauge
- single numeric value that can arbitrarily go up and down 
- Gauge have three main method `inc(), dec(), set()` that inc, dec, value by one and set the gauge to an arbitrary value respectively
3. Summary
- Sample obersation like request duration- how long you application took to respond to a request. latency and request size 
- primary method `observe()` 
4. Histogram
- Sample obervation (usually things like duration or response sizes) and counts then in configurable buckets
- Instruments for histogram is same as for summary
- main purpose of histogram is to calculating quantiles