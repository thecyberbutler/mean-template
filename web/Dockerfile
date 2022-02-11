# syntax=docker/dockerfile:1

FROM node:16-alpine AS build

WORKDIR /app

COPY ["package.json", "package-lock.json", "/app/"]

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist/web /usr/share/nginx/html