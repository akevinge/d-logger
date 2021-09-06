FROM node:16.8.0-alpine3.11

WORKDIR /usr/discord-logger

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build
COPY .env ./dist/

WORKDIR ./dist

ENV NODE_ENV=production

CMD node index.js