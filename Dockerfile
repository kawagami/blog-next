FROM node:21-slim

WORKDIR /app

COPY . .

RUN npm install
# RUN npm run build

# CMD npm run start
CMD npm run dev