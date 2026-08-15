#!/bin/bash
set -e

NAME=$1
OUTPORT=$2
INPORT=$3

# Create a container named mongodb_tours from the MongoDB image
docker create --name $NAME -p $OUTPORT:$INPORT mongodb/mongodb-community-server:latest

echo "Container '$NAME' erfolgreich erstellt."
