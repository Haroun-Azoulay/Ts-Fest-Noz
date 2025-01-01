FROM debian:bookworm

WORKDIR /app

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y nodejs npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


COPY package*.json ./


RUN npm install


COPY . .


RUN chmod +x app.js

EXPOSE 3001

CMD ["node", "app.js"]
