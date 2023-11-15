# Http
- REF: *https://docs.google.com/document/d/1wEdTyk14LK00DN-3hIFoP7RTcbf2T8beNI_tVsv6xI4/edit?usp=sharing*

## GET
- GET method is used to fetch the information which is specified in the request URI

1. Simple GET
```sh
# Syntax
GET <request uri> HTTP/1.1
Host: <fqdn or publicIP>
# Example
GET /login.html HTTP/1.1
Host: splunk.raghib.in
```

2. Conditinal GET 
- Used to fetch th einformation with a condition
```sh
GET /sample.html HTTP/1.1
Host: sample.raghib.in
If-Modified-Since: Sat, 29 Oct 2017 19:43:31 GMT
```

3. Partial GET
- Used to retrieve only specific content instead of eerything
```sh
GET /movies.mp4 HTTP/1.1
Host: movie.raghib.in
Range: byte=0-1024
```
### GET request through CLI
- Simple Get
```sh
telnet <hostname or IP> in <port-no.>

GET /movie.html HTTP/1.1
Host: 51.20.125.214
```

- Partial GET
```sh
# Syntax
curl <hostname or IP>/<request uri>

# Print only response header
curl -I "Range: bytes=0-20" 51.20.125.214/partial.txt
curl --header "Range: bytes=0-20" 51.20.125.214/partial.txt
```

- Condition GET
```sh
# Syntax
curl --header "If-Modified-Since: <date>" <host/request-uri>

curl --header "If-Modified-Since: Tue, 14 Nov 2023 13:47:28 GMT" 51.20.125.214/partial.txt
```
\## POST
- Used to send data to the server to be processed in some way 
```sh
POST /login.php HTTP/1.1
COntent-Type: application/x-www-form-urlencoded
Content-Lenght:32
```
## HEAD
- Response had two parts
    - Header Fields
    - Message Body
```sh
curl -I url
```

## TRACE
- Used for debug purpose

```
curl -X "TRACE" url
curl -X "TRACE" --proxy url server-url
```