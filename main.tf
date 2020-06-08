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

resource "aws_s3_bucket" "terraform_state" {
  bucket = "tw-poker-terraform-state-prod-please-be-uniq"
  # Enable versioning so we can see the full revision history of our
  # state files
  versioning {
    enabled = true
  }
  # Enable server-side encryption by default
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

# data "terraform_remote_state" "network" {
#   backend = "s3"
#   config = {
#     bucket = "terraform-state-prod"
#     key    = "poker/terraform.tfstate"
#     region = "ap-southeast-1"
#   }
# }
