1. Create EFS

2. Create EC2

3. Mount EFS in ec2
```sh
yum install -y amazon-efs-utils


# Create a directory efs
mkdir efs

# To mount using the file system id
sudo mount -t efs file-system-id efs-mount-point/
```

4. Create Access Point
- folder: /app-1-folder
- posix user and group: 1001

2. Create folder inside root directory
- /app-1 /app-2

3. Mounting with EFS access points
```sh
sudo mount -t efs-mount-point -o tls,accesspoint=access-point-id file-system-id efs-mount-point
mount -t efs -o tls,accesspoint=fsap-0836c9e72b1fb6da9 fs-0e96819c325c6c94f app-2
```