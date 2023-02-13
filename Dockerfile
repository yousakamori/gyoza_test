FROM node:18-slim

RUN apt-get update
RUN apt-get install -y openssl
