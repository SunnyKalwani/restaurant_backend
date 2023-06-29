const Sequelize = require("sequelize");
const config = require("./../config");

const Reservation = config.define("Reservation", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.INTEGER,
        allowNullL: false
    },
    reservation_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    numberofpeople: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Reservation;