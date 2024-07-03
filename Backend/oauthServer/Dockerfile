
FROM debian:bookworm

WORKDIR /app

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y nodejs npm \
    && apt-get install -y postgresql postgresql-contrib \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install \
    && npm i oauth2-server \
    && npm i express \
    && npm i dotenv \
    && npm i simple-oauth2 \
    && npm i axios

COPY model.js /app/

COPY . .



EXPOSE 4000

CMD ["node", "oauthServer.js"]
