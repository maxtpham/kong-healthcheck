#!/bin/bash
# file: portainer.sh
cd ..
docker stack deploy --compose-file=docker-compose-portainer.yml portainer