variable "image" {
#  default = "CentOS-7-x86_64-1702"
  default = "ubuntu-16.04-x64"
}

variable "flavor" {
  default = "Small"
}

variable "ssh_key_file" {
  default = "~/.ssh/id_rsa"
}

variable "ssh_user_name" {
#  default = "centos"
  default = "ubuntu"
}

variable "external_gateway" {
  default = "f6bfb8e4-95c8-40c6-8e5e-a7ae8a7e6517"
}

variable "pool" {
  default = "admin_ciofip_net"
}

variable "elastic" {
  default ="3"
}

variable "os_name" {
  default ="ubuntu"
}
