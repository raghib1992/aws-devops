### To instrument this application, we will make use of the prometheus-client python library. Install the same by running the following command on prometheus-server
```sh
pip install prometheus-client
```

```py
from prometheus_client
from flask import Flask
#import the Counter object from the prometheus-client library
from prometheus_client import Counter, start_http_server

# Create a Counter object and name it REQUESTS
# Add two labels path and method to the REQUESTS counter
REQUESTS = Counter('http_requests_total',
                   'Total number of requests', labelnames=['path', 'method'])

ERRORS = Counter('http_errors_total',
                 'Total number of errors', labelnames=['code'])

IN_PROGRESS = Gauge('inprogress_requests',
                    'Total number of requests in progress')

def before_request():
    IN_PROGRESS.inc()

def after_request(response):
    IN_PROGRESS.dec()
    return response

app = Flask(__name__)

@app.get("/products")
def get_products():
    REQUESTS.inc()
    return "product"

@app.post("/products")
def create_product():
    REQUESTS.inc()
    return "created product", 201

@app.get("/cart")
def get_cart():
    REQUESTS.inc()
    return "cart"

@app.post("/cart")
def create_cart():
    REQUESTS.inc()
    return "created cart", 201

@app.errorhandler(404)
def page_not_found(e):
    ERRORS.labels('404').inc()
    return "page not found", 404

if __name__ == '__main__':
    start_http_server(8000)
    app.run(debug=False, host="0.0.0.0", port='6000')
```

#### Configure a new job named api to scrape our Flask application and restart the Prometheus
- Edit the /etc/prometheus/prometheus.yml file:
```sh
vi  /etc/prometheus/prometheus.yml
```
- Add below lines under scrape_configs:
```yml
  - job_name: "api"
    static_configs:
      - targets: ["localhost:8000"]
```
- Restart prometheus service:
```sh
systemctl restart prometheus
```