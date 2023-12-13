const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Card = sequelize.define('card', {
    idCard: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    methodPayment: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
    cardNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
    nameCard: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },

    expiredDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: false
    },
    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
},
    {
        timestamps: false
    }
);

module.exports = Card;

