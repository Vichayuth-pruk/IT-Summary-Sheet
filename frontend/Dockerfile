FROM node:16.14-alpine as build-stage
WORKDIR /app
COPY package*.json yarn*.lock ./
RUN yarn install
COPY ./ .
RUN yarn build

EXPOSE 4173
CMD ["npm", "start"]