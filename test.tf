terraform {
  required_version = "~> 1.0"
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
#   backend "s3" {
#     bucket = "value"
#     key = "value"

#   }
}

provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "amzlnx2" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-kernel-5.10-hvm*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
   filter {
    name   = "root-device-type"
    values = ["ebs"]
  }
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  owners = ["amazon"] # Canonical
}

data "aws_availability_zones" "azs" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

data "aws_ec2_instance_type_offerings" "my_inst_type" {
  for_each = toset(data.aws_availability_zones.azs.names)
  filter {
    name   = "instance-type"
    values = ["t3.micro"]
  }

  filter {
    name   = "location"
    values = [each.key]
  }

  location_type = "availability-zone"
}

resource "aws_instance" "myweb" {
  for_each = toset(keys({
    for az, it in data.aws_ec2_instance_type_offerings.my_inst_type:
    az => it.instance_types if length(it.instance_types) != 0
  }))  
  instance_type = "t3.micro"
  ami = data.aws_ami.amzlnx2.id
  key_name = "sankalan-virginia-key"
  availability_zone = each.value
  tags = {
    name = "myweb-${each.key}"
  }
}

# output "my_azones" {
#   value = keys({
#     for az, it in data.aws_ec2_instance_type_offerings.my_inst_type:
#     az => it.instance_types if length(it.instance_types) != 0
#   })
# }

output "myweb_public_ip" {
  value = { 
    for az, instance in aws_instance.myweb:
    az => instance.public_ip
  }
}