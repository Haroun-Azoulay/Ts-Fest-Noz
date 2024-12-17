#!/bin/bash

npx prettier . --write

docker-compose up --build 