#! /bin/sh

sudo docker run --rm -d -p 80:3000 twlifeguard/poker-client
sudo docker run --rm -d -p 5000:5000 twlifeguard/poker-server
