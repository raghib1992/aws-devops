
variable "range" {
  default = [10.0.0.1, 10.0.0.2,10]
}

resource "aws_subnet" "main" {
  vpc_id     = aws_vpc.main.id
  dynamic "setting" {
    for_each = var.ranges
    content {
      cidr_block = setting.value
      tags = {
        Name = "Main"
      }
    }
  }
  

  tags = {
    Name = "Main"
  }
}

branch a 123
branch b 45

data types
which data types in which scenario

terrafrom drift
how to handles drift

addtional security
create db - 
db with private endpoint
