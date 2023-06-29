const Sequelize = require('sequelize');
const config = require('../config');

const Food = config.define("Food", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    item_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    item_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    veg_nonveg: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Food;