# Stage 1: Build Angular app
FROM node:14-alpine AS builder

WORKDIR /app/Frontend

# Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Construire l'application Angular
RUN npm run build

# Stage 2: Utiliser une image plus petite pour la production
FROM nginx:1.18-alpine

# Définir le répertoire de travail dans le deuxième stage
WORKDIR /usr/share/nginx/html

# Copier la sortie de la construction du stage précédent
COPY --from=builder /app/Frontend/dist/frontend .

# Exposer le port sur lequel votre application fonctionne
EXPOSE 80

# Commande pour exécuter votre application
CMD ["nginx", "-g", "daemon off;"]
# Autres directives d'événements si nécessaires
