provider "aws" {
  version = "~> 2.0"
  region  = "ap-southeast-1"
}

resource "aws_instance" "test_box" {
  ami           = "ami-0615132a0f36d24f4"
  instance_type = "t2.micro"
}
