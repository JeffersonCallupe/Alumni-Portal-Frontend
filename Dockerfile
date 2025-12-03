# Etapa 1: Construcción
FROM node:lts-bullseye as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servir contenido
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY src/assets/ /usr/share/nginx/html/assets
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
