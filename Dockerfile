FROM node:16.14.2-alpine AS base

WORKDIR /app

COPY ["package.json", "yarn.lock*", "./"]

# Development stage
FROM base AS dev

RUN npm install
COPY . .
CMD ["yarn", "start:dev"]

# Production stage
FROM base AS prod

RUN npm install --production
COPY . .
RUN npm run build
CMD ["yarn", "start:prod"]