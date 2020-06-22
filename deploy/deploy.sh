#! /bin/sh
docker stop poker-client poker-server || true
docker run --rm -d -p 80:80 --name poker-client twlifeguard/poker-client
docker run --rm -d -p 5000:5000 --name poker-server twlifeguard/poker-server
