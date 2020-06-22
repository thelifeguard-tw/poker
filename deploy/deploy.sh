#! /bin/sh
sudo docker stop poker-client poker-server || true
sudo docker run --rm -d -p 80:80 --name poker-client twlifeguard/poker-client
sudo docker run --rm -d -p 5000:5000 --name poker-server twlifeguard/poker-server
