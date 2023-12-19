// Charger les variables d'environnement
require('dotenv').config();

const Sequelize = require('sequelize')

// Initialiser Sequelize avec les informations de connexion
const sequelize = new Sequelize(
    'ecamazon_users',
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST || '172.21.0.2'
});

module.exports = sequelize