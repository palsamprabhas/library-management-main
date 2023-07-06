# Stage 1: Build Angular app
FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve Angular app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/library-management-system-ui/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
