FROM debian:bookworm

WORKDIR /app

RUN apt update && apt upgrade -y \
    && apt install -y npm \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm install

EXPOSE 5174

CMD ["npm", "run", "serve"]


