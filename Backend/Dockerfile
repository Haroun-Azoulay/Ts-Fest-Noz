FROM debian:bookworm

WORKDIR /app

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y nodejs npm \
    postgresql postgresql-contrib \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./

COPY .env ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
