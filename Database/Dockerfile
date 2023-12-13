# Dockerfile pour le service de base de données (Backend/Database/Dockerfile)

FROM mysql:8.0

# Ajoutez ces lignes pour copier le script d'initialisation dans le conteneur
COPY init.sql /docker-entrypoint-initdb.d/
