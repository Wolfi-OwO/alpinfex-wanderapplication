#!/bin/bash

set -e

NAME=$1
PORT=$2

# Start the container named mongodb_tours
docker start $NAME

echo "Container '$NAME' wurde erfolgreich gestartet und ist auf Port $PORT erreichbar."
