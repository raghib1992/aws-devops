# Lambda

## version
## Alias
## function url
## export
## layer
## concurrency
#### max 1000

## Configuration
### Billing in multiple of 100ms
### memory allocate (RAM)
### min memory 128mb and increment in rate of 64mb and max upto 3008mb
### cpu power proportional to memory
### function larger than 1536mb, allocate multiple cpu threads

## max executuion time
### default time 3 sec and max time is 300 sec

## Iam Role
### Lambda assume role when it executes

## access aws and non aws servicea
## services in vpc

## private vpc access, then lambda associates with vpc

## innvokes

1. synchronous invoke
    Invocation Flags 'Request responce'
2. Asynchronous invoke
3. Poll based invoke
    kinesis, sqs, dynamodb streams

