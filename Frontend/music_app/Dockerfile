FROM debian:bookworm


RUN apt-get update && apt-get upgrade -y \
    && apt-get update && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y npm

WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .



EXPOSE 5173


CMD ["npm", "run", "serve"]

