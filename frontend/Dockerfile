# Stage 1 - Build project
FROM node:lts-alpine as build-stage

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2 - Deploy with NGINX
FROM nginx:latest as production-stage

COPY --from=build-stage /usr/src/app/dist /app
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./.nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./.nginx/index.html /main/index.html

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
