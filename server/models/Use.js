const Sequelize = require("sequelize");
const db = require("../utils/db");

const Use = db.define("Use", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  receiptno: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  accounttype: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountno: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  accountname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountbalance: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  amounttopay: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  amounttendered: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  change: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  paymenttype: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  incomegroupcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Use;
