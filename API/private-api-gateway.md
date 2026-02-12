# Tutorial: Create a Private REST API with Amazon API Gateway

```markdown
This tutorial walks you through building a **private REST API** in Amazon API Gateway.  
Clients can access the API only from within your **Amazon VPC**, ensuring isolation from the public internet.

---

## Prerequisites
- An **AWS account**.
- An **IAM user** with console access and permissions to create API Gateway, Lambda, EC2, and CloudFormation resources.

---

## Step 1: Create Dependencies
1. **Download CloudFormation template** (`template.yaml`) from AWS docs.
2. Go to **CloudFormation Console** → [https://console.aws.amazon.com/cloudformation](https://console.aws.amazon.com/cloudformation).
3. Click **Create stack** → **With new resources (standard)**.
4. Under **Specify template**, choose **Upload a template file** → select the downloaded file.
5. Click **Next**.
6. Enter **Stack name**: `private-api-tutorial`.
7. Click **Next** through options.
8. Under **Capabilities**, acknowledge IAM resource creation.
9. Click **Submit**.
10. Wait until status = **CREATE_COMPLETE**.
11. Go to **Outputs** tab → note your **VPC endpoint ID** (needed later).

---

## Step 2: Create a Private API
1. Go to **API Gateway Console** → [https://console.aws.amazon.com/apigateway](https://console.aws.amazon.com/apigateway).
2. Click **Create API** → choose **REST API → Build**.
3. Enter **API name**: `private-api-tutorial`.
4. Set **Endpoint type**: **Private**.
5. Enter your **VPC endpoint ID** from Step 1.
6. Set **IP address type**: **Dualstack**.
7. Click **Create API**.

---

## Step 3: Create a Method & Integration
1. In your API, click **Create method**.
2. Choose **GET**.
3. For **Integration type**, select **Lambda function**.
4. Enable **Lambda proxy integration**.
5. Select the Lambda function created by CloudFormation (name starts with `private-api-tutorial`).
6. Click **Create method**.

---

## Step 4: Attach a Resource Policy
1. In API Gateway console, open your API.
2. Click **Resource policy** → **Create policy**.
3. Paste the following JSON (replace `vpce-abcd1234` with your actual VPC endpoint ID):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Principal": "*",
            "Action": "execute-api:Invoke",
            "Resource": "execute-api:/*",
            "Condition": {
                "StringNotEquals": {
                    "aws:sourceVpce": "vpce-abcd1234"
                }
            }
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "execute-api:Invoke",
            "Resource": "execute-api:/*"
        }
    ]
}
```

---

## Step 5: Deploy Your API
1. In API Gateway console, select your API.
2. Click **Deploy API**.
3. For **Stage**, choose **New stage**.
4. Enter **Stage name**: `test`.
5. (Optional) Add description.
6. Click **Deploy**.
7. Copy the **Invoke URL** (looks like `https://abcdef123.execute-api.us-west-2.amazonaws.com/test`).

---

## Step 6: Verify API Isn't Publicly Accessible
From outside your VPC, run:

```bash
curl https://abcdef123.execute-api.us-west-2.amazonaws.com/test
```

**Expected**: Host not resolved (API inaccessible).

---

## Step 7: Test Inside the VPC
1. Go to **EC2 Console** → [https://console.aws.amazon.com/ec2](https://console.aws.amazon.com/ec2).
2. Select the instance named `private-api-tutorial`.
3. Click **Connect** → choose **Session Manager** → **Connect**.
4. In the session, run:

```bash
curl https://abcdef123.execute-api.us-west-2.amazonaws.com/test
```

**Expected response**:

```
Hello from Lambda!
```

---

## Step 8: Clean Up
1. In API Gateway console, select your API → **API actions** → **Delete API**.
2. In CloudFormation console, select your stack → **Delete**.
```