// Charger les variables d'environnement
require('dotenv').config();

const Sequelize = require('sequelize')

// Initialiser Sequelize avec les informations de connexion
const sequelize = new Sequelize(
    'ecamazon_users',
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: 'mysql-service' || process.env.BD_HOST
});

module.exports = sequelize