FROM node:alpine3.20

WORKDIR /app

USER root

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev"]

