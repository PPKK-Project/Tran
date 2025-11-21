FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
# RUN npm install --save-dev @types/sockjs-client @types/react-dom
COPY . .
ARG VITE_BASE_URL
RUN npm run build -- --base=$VITE_BASE_URL
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]