Convert domain name to Ip address
To check the Ip address
```sh
nslookup <domain name>
nslookup google.com
nslookup -type=TXT uzma.raghib.in
ping google.com
```

```sh
dig <domain name>
dig <domain name> <dns type>
dif raghib.click AAAA
```

DNS Record

it is a mapping files stored in dns server

A       - IPv4
AAAA    - IPv6
CNAME   - POinting doamin name to other hosted name
ALIAS
MX      - Mail exchange - responsible for accepting emial message behalf of domain name
NS
PTR
SOA
TXT

## Bind is a popular software used for DNS

## Hosted ZOne
### Private Hosted zone associated with VPC and for its internal network
### Public Hosted ZOne associated with Internet


# How to change NamesServer from Other Registrar to Route53

1. Create Hosted ZOne
2. Change Ns record form other registrar(godaady) and add route53 NS record

***
Features of Route 3
1. Support public and private host zone
2. Routing Policy -Weighted, Latency, Geolocation
3. Health Check and Monitoring
4. Route53 Endpoint
5. DNS Firewall


# Delegation Set
### Whenever creating NS, get for NS record, collectively called delegation set
```
ns-1590.awsdns-06.co.uk.
ns-1066.awsdns-05.org.
ns-473.awsdns-59.com.
ns-606.awsdns-11.net.
```
### To create reusable delegation set
##### It should be done through aws-cli
##### List reusable delegation set
```
aws route53 list-reusable-delegation-sets
```
##### Create reusable delegation set
```
aws route53 create-reusable-delegation-set --caller-reference <random value>
aws route53 create-reusable-delegation-set --caller-reference first-delegation-set
```

#### Create Hosted zone useing delegation id
```
aws route53 create-hosted-zone --name <value> --caller-reference set1 --delegation-set-id /delegationset/N099794433991OCEVWB7U
```