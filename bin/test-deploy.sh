#!/bin/bash
# file: test-deploy.sh
cd ..
docker stack deploy -c docker-compose-test.yml test