FROM debian:bookworm


RUN apt-get update && apt-get upgrade -y \
    && apt-get update && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y npm \


WORKDIR /app


COPY package*.json ./


RUN npm install \
    npm install --save jwt-decode \
    npm install --save @types/jwt-decode


COPY . .
# voir une image node js fixe nginx pour file static utiliser proxy


EXPOSE 5174


CMD ["npm", "run", "serve"]

