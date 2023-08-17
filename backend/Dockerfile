# Stage 1 - Build project
FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${BLOG_BACKEND_PORT}

ENTRYPOINT [ "npm", "run", "backend-prod"]
