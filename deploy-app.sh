#!/bin/bash
IMAGE_NAME="fterdev/4minatorui"

CONTAINER_NAME="4-minator-ui"


echo "Stopping existing container..."
docker stop $CONTAINER_NAME

echo "Removing existing container..."
docker rm $CONTAINER_NAME

echo "Pulling the latest image..."
docker pull $IMAGE_NAME


echo "Starting new container..."
docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME

echo "Deployment completed successfully."
