#!/bin/bash

docker run --rm -it -v $PWD:/app -w /app -u $(id -u):$(id -g) node:23.5.0-bookworm $@
