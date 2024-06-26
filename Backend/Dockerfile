FROM debian:bookworm

WORKDIR /app

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y nodejs npm \
    && apt-get install -y postgresql postgresql-contrib \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY .env ./

RUN npm install


RUN npm install --save-dev @types/cors @types/express-session @types/axios @types/simple-oauth2


RUN npm install jwt-decode

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
