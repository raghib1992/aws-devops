1. Create EFS

2. Create Ec2

3. allow inbound in EFS security group
- NFS port 2049 source **EC2 Security Group**

4.  Install the NFS Client on Your EC2 Instance
### Ref: https://docs.aws.amazon.com/efs/latest/ug/wt1-test.html
```sh
# Public DNS name of your EC2 instance in the following format:
ec2-13-53-100-41.eu-north-1.compute.amazonaws.com

# DNS name of your file system. You can construct this DNS name using the following generic form:
fs-08728077a8d85bbc7.efs.eu-north-1.amazonaws.com

# Get updates 
sudo yum -y update

# Install the NFS client.
sudo yum -y install nfs-utils
```

5. Mount the file system on your EC2 instance and test
```sh
# Make a directory ("efs-mount-point").
mkdir ~/efs-mount-point 

# Mount the Amazon EFS file system.
sudo mount -t nfs -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport fs-06ce4f1bc2797c33a.efs.eu-north-1.amazonaws.com:/   ~/efs-mount-point

sudo mount -t nfs -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport 172.31.16.223:/  ~/efs-mount-point

# Verify file system
df -h

cd efs-mount-point
touch server.txt
```

6. Manually installing the Amazon EFS client
### Ref: https://docs.aws.amazon.com/efs/latest/ug/installing-amazon-efs-utils.html
### Installing the Amazon EFS client on Amazon Linux and Amazon Linux 2
```sh
sudo yum install -y amazon-efs-utils
```

7. Mounting on Amazon EC2 Linux instances using the EFS mount helper
### Ref: https://docs.aws.amazon.com/efs/latest/ug/mounting-fs-mount-helper-ec2-linux.html
```sh
# mount efs
sudo mount -t efs fs-0e96819c325c6c94f tmp-efs/

# mount efs one zone
sudo mount -t efs -o az=us-east-1a,tls fs-08728077a8d85bbc7 efs/

# check mount point
aws efs describe-mount-targets --file-system-id  fs-08728077a8d85bbc7 --region eu-north-1
```
