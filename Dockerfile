FROM node:18.12.0-alpine3.15 AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install yarn
RUN yarn add @nestjs/cli
RUN yarn add @types/cache-manager-ioredis
RUN yarn install
COPY . .
RUN yarn build

FROM node:18.12.0-alpine3.15 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]