FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/dist/medgpt-frontend/browser /opt/site
COPY nginx.conf /etc/nginx/nginx.conf
