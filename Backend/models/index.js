const Sequelize = require('sequelize')
const sequelize = require('../db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./userModel');
db.Card = require('./cardModel');
db.Address = require('./addressModel');


//relation 1 à plusieurs entre user et post
db.Card.belongsTo(db.User, { foreignKey: "idUser", onDelete: 'CASCADE' });
db.User.hasMany(db.Card, { foreignKey: "idUser" });

//relation 1 à plusieurs entre User et Address
db.Address.belongsTo(db.User, { foreignKey: 'idUser' });
db.User.hasMany(db.Address, { foreignKey: 'idUser', onDelete: 'CASCADE' });


module.exports = db