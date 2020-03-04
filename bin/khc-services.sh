#!/bin/bash
# file: test-services.sh
echo Kong KHC-Master: http://localhost:8000/khc-master
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams -d '{ "name": "khc-master" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/upstreams/khc-master/targets -d '{ "target": "khc_master:80" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services -d '{ "name": "khc-master", "url": "http://khc-master" }'
curl -X POST -H "Content-Type: application/json" http://localhost:8001/services/khc-master/routes -d '{ "name": "khc-master", "paths": ["/khc-master"], "strip_path": true }'
