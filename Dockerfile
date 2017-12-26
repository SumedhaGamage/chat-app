FROM node:alpine

RUN mkdir -p  /app
WORKDIR /app

COPY package.json package.json

RUN npm install

EXPOSE 3000

CMD ["node", "server/server.js"]
