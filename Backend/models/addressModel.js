const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Address = sequelize.define('address', {
    idAddress: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    typeAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    postalCode: {
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

module.exports = Address;

