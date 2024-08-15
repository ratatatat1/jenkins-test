FROM nginx:1.15-alpine
COPY dist/ /etc/nginx/html/
COPY conf /etc/nginx/conf.d
WORKDIR /etc/nginx/html