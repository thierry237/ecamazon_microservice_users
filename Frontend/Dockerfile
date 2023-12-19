FROM node:20-alpine AS angular
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties esc2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM  nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=angular /app/dist/frontend /usr/share/nginx/html
EXPOSE 80