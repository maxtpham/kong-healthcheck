# Kong Health-check
Automatically detect &amp; health-check for all backends, services &amp; routes in Kong API Gateway, then notify to Slack &amp; publish healthy/unhealthy status to InfluxDB/Grafana

# Getting started
```bash
cd bin/

# init swarm mode for local docker
docker swarm init

# create khc-net network
./network.sh

# deploy the kong & db
./kong-deploy.sh

# ...wait for 1 minute
# looking for kong:latest & postgres:9.5
docker container ls

# browse to kong endpoints:
# - home: http://localhost:8000
# - admin: http://localhost:8001

# create test services (nginx & httpd)
./test-deploy.sh
# map Kong to test services
# - http://localhost:8000/nginx
# - http://localhost:8000/httpd
./test-services.sh


# create KHC services (master & worker)
./khc-deploy.sh
# map Kong to test services
# - http://localhost:8000/khc-master
# - http://localhost:8000/khc-worker
./khc-services.sh

```