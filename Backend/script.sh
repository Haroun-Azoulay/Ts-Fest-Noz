#!/bin/bash

if [ "$1" = "-run" ]; then
    npx prettier . --write
    docker-compose up --build
elif [ "$1" = "-test" ]; then
    echo "Running npm test..."
    npm run test
else
    echo "You forgot flag -run or -test"
fi


