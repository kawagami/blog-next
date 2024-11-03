#!/bin/bash

docker run --rm -it -v $PWD:/app -w /app -u $(id -u):$(id -g) node:22-slim $@
