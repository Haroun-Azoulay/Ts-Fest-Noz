FROM debian:bookworm

WORKDIR /app

RUN apt update && apt upgrade -y \
    && apt install -y nodejs npm \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

COPY .env ./

COPY . .

RUN rm -rf node_modules package-lock.json \
    && npm install --legacy-peer-deps

EXPOSE 5173

CMD ["npm", "run", "dev"]


