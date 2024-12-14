FROM debian:bookworm


WORKDIR /app


RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs npm postgresql postgresql-contrib && \
    apt-get clean && rm -rf /var/lib/apt/lists/*


COPY package*.json ./


RUN npm install


COPY . .


RUN chmod +x oauthServer.js

EXPOSE 4000

CMD ["node", "oauthServer.js"]
