Module 3: Serverless Service Backend

In this module, you will use AWS Lambda and Amazon DynamoDB to build a backend process for handling requests for your web application. The browser application that you deployed in the first module allows users to request that a unicorn be sent to a location of their choice. To fulfill those requests, the JavaScript running in the browser will need to invoke a service running in the cloud.
You will implement a Lambda function that will be invoked each time a user requests a unicorn. The function will select a unicorn from the fleet, record the request in a DynamoDB table, and then respond to the frontend application with details about the unicorn being dispatched.

The function is invoked from the browser using Amazon API Gateway. You'll implement that connection in the next module. For this module, you will just test your function in isolation.

1. Create DynamoDB Table
Use the Amazon DynamoDB console to create a new DynamoDB table. 

In the Amazon DynamoDB console, choose Create table.
For the Table name, enter Rides. This field is case sensitive.
For the Partition key, enter RideId and select String for the key type. This field is case sensitive.
In the Table settings section, ensure Default settings is selected, and choose Create table. 
On the Tables page, wait for your table creation to complete. Once it is completed, the status will say Active. Select your table name.
In the Overview tab > General Information section of your new table and choose Additional info. Copy the ARN. You will use this in the next section.
2. Create IAM role for Lambda Function