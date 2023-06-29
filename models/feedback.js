const Sequelize = require("sequelize");
const config = require("./../config");

const Feedback = config.define("Feedback", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    feedback: {
        type: Sequelize.STRING,
        allowNull: false
    },
    feedback_date:{
        type: Sequelize.DATE,
        allowNull: false
    }
}, { timestamps: false });

module.exports = Feedback;