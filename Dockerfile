FROM nginx:1.15-alpine
COPY index.html /etc/nginx/html/
COPY conf /usr/local/nginx/conf/conf.d
WORKDIR /etc/nginx/html