#!/bin/bash
# file: khc-deploy.sh
cd ..
docker-compose -f docker-compose.yml build
docker stack deploy -c docker-compose.yml khc