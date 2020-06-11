terraform {
  backend "remote" {
    # The name of your Terraform Cloud organization.
    organization = "tw-lifeguard"

    # The name of the Terraform Cloud workspace to store Terraform state files in.
    workspaces {
      name = "tw-lifeguard"
    }
  }
}

provider "aws" {
  version = "~> 2.0"
  region  = "ap-southeast-1"
}

resource "aws_instance" "lifeguard-prod" {
  ami           = "ami-0615132a0f36d24f4"
  instance_type = "t2.micro"
}

# resource "aws_s3_bucket" "terraform_state" {
#   bucket = "tw-poker-terraform-state-prod-please-be-uniq"
#   # Enable versioning so we can see the full revision history of our
#   # state files
#   versioning {
#     enabled = true
#   }
#   # Enable server-side encryption by default
#   server_side_encryption_configuration {
#     rule {
#       apply_server_side_encryption_by_default {
#         sse_algorithm = "AES256"
#       }
#     }
#   }
# }

# resource "aws_vpc" "main" {
#   cidr_block = "10.0.0.0/16"
# }
# resource "aws_subnet" "example1" {
#   vpc_id            = "${aws_vpc.main.id}"
#   cidr_block        = "10.0.1.0/24"
#   availability_zone = "ap-southeast-1a"
# }
# resource "aws_subnet" "example2" {
#   vpc_id            = "${aws_vpc.main.id}"
#   cidr_block        = "10.0.2.0/24"
#   availability_zone = "ap-southeast-1b"
# }

# resource "aws_eks_cluster" "default" {
#   name     = "default"
#   role_arn = "${aws_iam_role.example.arn}"

#   vpc_config {
#     subnet_ids = ["${aws_subnet.example1.id}", "${aws_subnet.example2.id}"]
#   }

#   # Ensure that IAM Role permissions are created before and deleted after EKS Cluster handling.
#   # Otherwise, EKS will not be able to properly delete EKS managed EC2 infrastructure such as Security Groups.
#   depends_on = [
#     "aws_iam_role_policy_attachment.example-AmazonEKSClusterPolicy",
#     "aws_iam_role_policy_attachment.example-AmazonEKSServicePolicy",
#   ]
# }
# output "endpoint" {
#   value = "${aws_eks_cluster.default.endpoint}"
# }

# output "kubeconfig-certificate-authority-data" {
#   value = "${aws_eks_cluster.default.certificate_authority.0.data}"
# }
# resource "aws_iam_role" "example" {
#   name = "eks-cluster-example"

#   assume_role_policy = <<POLICY
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "eks.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole"
#     }
#   ]
# }
# POLICY
# }

# resource "aws_iam_role_policy_attachment" "example-AmazonEKSClusterPolicy" {
#   policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
#   role       = "${aws_iam_role.example.name}"
# }

# resource "aws_iam_role_policy_attachment" "example-AmazonEKSServicePolicy" {
#   policy_arn = "arn:aws:iam::aws:policy/AmazonEKSServicePolicy"
#   role       = "${aws_iam_role.example.name}"
# }
