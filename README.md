# Kong Health-check
Automatically detect &amp; health-check for all backends, services &amp; routes in Kong API Gateway, then notify to Slack &amp; publish healthy/unhealthy status to InfluxDB/Grafana

# Getting started
```bash
cd bin/

# init swarm mode for local docker
docker swarm init

# create khc-net network
./network.sh

# deploy the kong & db, wait for 1 minute
./kong-deploy.sh

# looking for kong:latest & postgres:9.5
docker container ls

# access points:
# - home: http://localhost:8000
# - admin: http://localhost:8001

# create test services (nginx & httpd)
./test-deploy.sh

# Kong Test-Service: http://localhost:8000/nginx
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams -d '{ "name": "nginx" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams/nginx/targets -d '{ "target": "test_nginx:80" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services -d '{ "name": "nginx", "url": "http://nginx" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services/nginx/routes -d '{ "name": "nginx", "paths": ["/nginx"], "strip_path": true }'

# Kong Test-Service: http://localhost:8000/httpd
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams -d '{ "name": "httpd" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams/httpd/targets -d '{ "target": "test_httpd:80" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services -d '{ "name": "httpd", "url": "http://httpd" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services/httpd/routes -d '{ "name": "httpd", "paths": ["/httpd"], "strip_path": true }'


```