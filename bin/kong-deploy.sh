#!/bin/bash
# file: kong-deploy.sh
cd ..
docker stack deploy -c docker-compose-kong.yml kong