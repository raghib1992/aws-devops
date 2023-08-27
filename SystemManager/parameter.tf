provider "aws" {
  region = "eu-north-1"
}

data "aws_ssm_parameter" "foo" {
  name = "mysql-db-secret"
}

output "db-pass" {
  value = data.aws_ssm_parameter.foo.value
  sensitive = true
}