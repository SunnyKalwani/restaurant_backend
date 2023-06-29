const Sequelize = require('sequelize');
const config = new Sequelize("capstoneproject", "root", "", {dialect: "mariadb"});

module.exports = config;