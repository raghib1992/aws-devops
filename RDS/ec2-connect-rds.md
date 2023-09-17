1. db endpoint
raghib-rds-demo.ctysujhh48kb.eu-north-1.rds.amazonaws.com

2. Create Security group for RDS
- name: raghib-demo-rds-sg
- inbound rule: mysql/arura port 3306 source ec2 sg

3. Install mysql client in ec2 to connect to rds
```sh
sudo yum install -y mariadb
# For amazon linux 2023
sudo dnf install mariadb105-server -y
```

4. Connect to rds
```sh
mysql -h raghib-rds-demo.ctysujhh48kb.eu-north-1.rds.amazonaws.com -u raghib -p
```