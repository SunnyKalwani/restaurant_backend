const Sequelize = require('sequelize');
const config = require('./../config');

const Order = config.define("Order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    items_ordered: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order_date: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps: false});

module.exports = Order;