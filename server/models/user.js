const Sequelize = require("sequelize");
const db = require("../utils/db");

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    Date: {
        type: Sequelize.DATE,
        allowNull: false,
        required: true,
        unique: true,
    },
    accounttype: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    accountno: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    accountname: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    accountbalance: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    amounttopay: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    amounttendered: {
        type: Sequelize.STRING,
        allowNull: true,
        required: true,
        unique: true,
    },
    change: {
        type: Sequelize.STRING,
        allowNull: true,
        required: true,
        unique: true,
    },
    paymenttype: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
    },
    incomegroupcode: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = User;
