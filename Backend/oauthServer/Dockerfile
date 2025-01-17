FROM debian:bookworm

WORKDIR /app

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y nodejs npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./

RUN npm install\
&& npm install typescript -g

COPY .env ./

COPY . .

RUN chmod +x oauth2server.ts

EXPOSE 3001

RUN tsc

CMD ["node", "oauth2server.js"]
