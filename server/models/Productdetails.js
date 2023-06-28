module.exports = (sequelize, DataTypes) => {
    const Productdetails = sequelize.define("Productdetails", {
      receiptNo: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      receivedFromAccountType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receivedFromAccountNumber: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      receivedFromAccountName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customerBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amountToPay: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amountTendered: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      change: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      incomeGroupCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    
    return Productdetails;
  };
  