one click thread detection

appropriate level of logs and events are needed for analysis to work

One of the challenges to detects the threads is- organization have to configure appropriate set of tools and configure logging annd create necessary levels of rules for detection.

Over come this problems - aws release amazon guard duty - 


# aws gurad duty 
```
Guard duty is threats detection service that continously monitors for malicious activity and unauthorized behaviour to protect your aws accounts, worklods, data stores.
```

### When enable guard duty, it monitor various logs by default:
1. cloudtrail events logs
2. cloudtrail management events
3. vpc flow logs
4. dns logs

### find sample findings
Accounts->settings->sample findings

## malware protection

### Open source tools Deep security software
#### Generally malware protectio done by installing agent in server

## Guar duty do agent less malware protection.
### It create snapshot of ebs and and create new ec2 with ebs volume created by snapshot and scan it.


### TO test malware protection
1. cretate ec2
2. download some malware file
wget https://secure.eicar.org/eicar_com.zip
3. Start on demand malcious scan

## White list IP 
1. create ip list plain text
2. upload the fie into s3 bucket
3. guard duty -> Trusted ip list -> add list
4. Activate the Ip list

## Similarlry add for threat ip list

## Finding types
https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.htm

## Centralized account for guard duty findings
master account
accounts
click omm add accounts by invitation
add account id and root email uid
select the accoint id and action invite

GO to slave accoutn
account
accept the invittion

## Once resolve the findings, archive it
## Supressed findings

