#!/bin/bash
# file: test-services.sh
echo Kong Test-Service: http://localhost:8000/nginx
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams -d '{ "name": "nginx" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams/nginx/targets -d '{ "target": "test_nginx:80" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services -d '{ "name": "nginx", "url": "http://nginx" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services/nginx/routes -d '{ "name": "nginx", "paths": ["/nginx"], "strip_path": true }'

echo Kong Test-Service: http://localhost:8000/httpd
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams -d '{ "name": "httpd" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams/httpd/targets -d '{ "target": "test_httpd:80" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services -d '{ "name": "httpd", "url": "http://httpd" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services/httpd/routes -d '{ "name": "httpd", "paths": ["/httpd"], "strip_path": true }'
