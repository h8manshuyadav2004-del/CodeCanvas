#!/bin/sh

# Wait for the Docker daemon to start up inside the container
until docker info > /dev/null 2>&1; do
  sleep 1
done

echo "=== DinD ready: Pre-loading execution runtime images ==="

docker pull frolvlad/alpine-gxx
docker pull node:18-alpine
docker pull python:3.9-alpine
docker pull golang:1.20-alpine

echo "=== All runtime images successfully loaded into DinD cache! ==="