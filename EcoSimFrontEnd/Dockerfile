
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


RUN ls -la /app/dist/ || echo


FROM nginx:alpine
COPY --from=build /app/dist/eco-sim-front-end /usr/share/nginx/html
EXPOSE 80
