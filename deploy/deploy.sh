#! /bin/sh
docker stop poker-client poker-server || true
docker pull twlifeguard/poker-client
docker pull twlifeguard/poker-server
docker run --rm -d -p 80:80 --name poker-client twlifeguard/poker-client
docker run --rm -d -p 5000:5000 -e GOOGLE_APPLICATION_CREDENTIALS="$1" --name poker-server twlifeguard/poker-server
