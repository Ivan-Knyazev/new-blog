FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${BLOG_BACKEND_PORT}

ENTRYPOINT [ "npm", "run", "backend-prod"]
