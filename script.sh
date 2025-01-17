#!/bin/bash

cd Backend 
bash script.sh full
echo "[Server BACKEND] is launch"

cd ../Frontend
docker-compose up --build
echo "[Server FRONTEND] is launch"


trap cleanup SIGINT
echo "[SHUT DOWN BACKEND DOCKER]"

cd Backend
docker-compose down