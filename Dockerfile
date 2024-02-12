#syntax:docker/dockerfile:1

FROM node:20.11.0-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production 
# --production is used to install the prod deps

COPY . .


RUN npm install global @nestjs/cli

RUN npm run build

CMD ["npm", "run", "start:prod"]
