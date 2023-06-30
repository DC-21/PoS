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
    unique: true,
  },
  accountno: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
  accountname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  accountbalance: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    unique: true,
  },
  amounttopay: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    unique: true,
  },
  amounttendered: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    unique: true,
  },
  change: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    unique: true,
  },
  paymenttype: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  incomegroupcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Use;
