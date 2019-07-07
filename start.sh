#!/bin/bash      

npm start 8001 &
npm start 8002 &
npm start 8003 &
node ./proxy/load-balancer.js 8000