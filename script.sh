#!/bin/bash


cleanup() {

    echo -n "Do you want to shut down all servers? (Y/n): "
    read -r response

    response=$(echo "$response")

    if [[ -z "$response" || "$response" == "y" ]]; then
        echo "[WAIT -------------------------- SHUTTING DOWN]"

        echo "[SHUTTING DOWN BACKEND]"
        cd Backend
        docker-compose down
        cd ..

        echo "[SHUTTING DOWN FRONTEND]"
        cd Frontend
        docker-compose down
        cd ..

        echo "[All SERVERS ARE SHUTTING DOWN]"
        exit 0
    else
        echo "Shutdown canceled. Servers are still running."
    fi
}

trap cleanup SIGINT

cd Backend 
bash script.sh -full &
echo "[Server BACKEND] is running"

cd ../Frontend
docker-compose up --build &
echo "[Server FRONTEND] is running"

wait
