FROM node:current-alpine3.16 as build
WORKDIR /app
COPY ./build /app
FROM nginx:1.16.0-alpine
COPY --from=build /app /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx_config/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
