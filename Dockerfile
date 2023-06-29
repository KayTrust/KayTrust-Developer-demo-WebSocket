FROM node:16 AS builder

WORKDIR /usr/src/app
COPY . .

FROM node:16
WORKDIR /usr/src/app
COPY . .

ENV PORT=8002

EXPOSE 8002
CMD [ "node", "dist/index.js" ]