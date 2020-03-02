#!/bin/bash
# file: networks.sh
docker network rm khc-net
docker network create --driver overlay --attachable khc-net
docker network ls