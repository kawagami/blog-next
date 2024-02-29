#!/bin/bash

docker run --rm -it -v $PWD:/app -w /app -u $(id -u):$(id -g) -p 3000:3000 node:21-slim npm run dev
