#!/bin/bash
set -e

# Pull the latest MongoDB community server image
docker pull mongodb/mongodb-community-server:latest

echo "MongoDB Image (community-server:latest) erfolgreich gepullt."
