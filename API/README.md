API APplication Programming Interface

Client connec to API and API has access of backend system
We can do various thing at api level
- cache
- authentication
- WAF
- Some kind of throtling
- etc


API Gateway
- There is **invoke url**
- to make API secure- API key required to make operation
- API cache
- API Throttling
- WAF
- Client Certificate
- Log and tracing
- Deployment History

## Demo -http api
2. API invoke Lambda function
1. Creating HTTP API
- Select Integration (Like Lambda, http, any backend)
- API Name
-
## Demo for Rest API
1. Create Lambda function
2. Create REST API
- Create Method to integrate Backend
- Test API
- Deploy API
- Create APi key
    - Create API key
    - Deploy API
    - Usage Plan

## API GAteway endpoint types
1. Edge Optimized Endpoints
- Best for geographically distributed clients
- API is follwed by cloudfront
2. Regional ENdpoints
- For same region, backend ec2
3. Private ENdpoints
- VPC based resources, like interface VPC endpoint

 