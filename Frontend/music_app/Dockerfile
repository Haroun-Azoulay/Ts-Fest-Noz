FROM debian:bookworm

WORKDIR /app

RUN apt update && apt upgrade -y \
    && apt install -y npm \
    && apt install curl -y \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "serve"]

