const Sequelize = require("sequelize");
const config = require("./../config");

const Customer_comment = config.define("Customer_comment", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer_name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    comment:{
        type: Sequelize.STRING,
        allowNull: false
    },
    comment_date:{
        type: Sequelize.DATE,
        allowNull: false
    }
},{timestamps: false});

module.exports = Customer_comment;