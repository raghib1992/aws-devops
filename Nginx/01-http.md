# Http
## Ref https://docs.google.com/document/d/1wEdTyk14LK00DN-3hIFoP7RTcbf2T8beNI_tVsv6xI4/edit?usp=sharing
## Manually Get HTTP
```sh
telnet <hostname or IP> in <port-no.>
```
```sh
GET <request uri> HTTP/1.1
Host: <fqdn or publicIP>
```
```
curl <hostname or IP>/<request uri>
```
### To get only header, not the file content
```
curl -I <hostname or IP>/<request uri>
```

## Partial GET
```
curl --header "Range: bytes=0-20" myserver.raghi.click/index.html
```

## Condition GET
```
curl --header "If-Modified-Since: <date>" <host/request-uri>
```
****************
## POST
