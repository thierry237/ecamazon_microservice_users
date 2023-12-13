# Utiliser une image légère de Node.js comme base
FROM node:14-alpine AS backend

# Définir le répertoire de travail
WORKDIR /app/Backend

# Copier les fichiers de configuration npm (package.json et package-lock.json) dans le conteneur
COPY package*.json ./

# Installer les dépendances (utiliser --production pour éviter les packages de développement)
RUN npm install 


# Copier le reste du code de l'application
COPY . .

# Exposer le port du backend
EXPOSE 3000

# Démarrer le backend avec nodemon
CMD ["npx","nodemon", "server.js"]
