# Metric

- 

# Metric Types
1. Counter
- How many times did X happen. good for measuring totalrequests, totalExpectations, totalJobExecution
- Sinle monotonically increase counter whose value can only increase or it can be reset on restart
- Counter are only one main method: inc() that increase the counter value by one
- DOn not use the value the counter to exopse a value that can decrease
2. Gauge
- What is current value of X
- Can go up and down
- Good for measuring current cpu utilization, available system memory, Number of concurrent requests
- single numeric value that can arbitrarily go up and down 
- Gauge have three main method `inc(), dec(), set()` that inc, dec, value by one and set the gauge to an arbitrary value respectively
3. Summary
- Similar to histograms(track how long or how big)
- How many observation fell below X
- Dont have to define quantiles ahead of time
- Sample obersation like request duration- how long you application took to respond to a request. latency and request size 
- primary method `observe()` 
4. Histogram
- How long and how big soemthing is
- Groups obersavation into configurable bucket sizes
- Sample obervation (usually things like duration or response sizes) and counts then in configurable buckets
- Instruments for histogram is same as for summary
- main purpose of histogram is to calculating quantiles