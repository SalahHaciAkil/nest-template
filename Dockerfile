FROM node:16.14.2-alpine AS base

WORKDIR /app

COPY ["package.json", "yarn.lock*", "./"]

# Development stage
FROM base AS dev
ENV NODE_ENV=development
RUN yarn install
COPY . .
CMD ["yarn", "start:dev"]
# Production stage
FROM base AS prod
ENV NODE_ENV=production
RUN yarn install --production
COPY . .
RUN yarn build
CMD ["yarn", "start:prod"]