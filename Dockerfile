FROM node:22-slim

WORKDIR /app

COPY . .
COPY .env .env.production

RUN npm install

RUN npm run build

CMD npm run start
