# Utilisez une image de Node.js pour le backend
FROM node:latest AS backend

WORKDIR /app/Backend
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ .

# Exposez le port du backend
# EXPOSE 3000

# Démarrer le backend avec nodemon
CMD ["npx", "nodemon", "server.js"]

# Utilisez une image Angular pour le frontend
FROM node:latest AS frontend

WORKDIR /app/Frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .

# Exposez le port du frontend
EXPOSE 4200

CMD ["npm", "start"]
