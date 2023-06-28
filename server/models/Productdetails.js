module.exports = (sequelize, DataTypes) => {
    const Productdetails = sequelize.define("Productdetails", {
      receiptno: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amounttopay: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amounttendered: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      change: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymenttype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      incomegroupcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Productdetails;
  };