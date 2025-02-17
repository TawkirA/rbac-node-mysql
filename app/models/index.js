const dbConfig = require('../config/db.config');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require('./user.model.js')(sequelize, Sequelize);

module.exports = db;
