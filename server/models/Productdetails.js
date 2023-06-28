module.exports = (sequelize, DataTypes)=>{
  const Productdetails = sequelize.define("Productdetails", {
      accountType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      accountName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        accountNo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        accountBalance: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
  });
  return Productdetails;
};