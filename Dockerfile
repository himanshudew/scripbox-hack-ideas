FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/scripbox-hack-ideas /usr/share/nginx/html