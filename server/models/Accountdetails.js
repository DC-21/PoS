module.exports = (sequelize, DataTypes)=>{
  const Accountdetails = sequelize.define("Accountdetails", {
      accountname: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      accountno: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      balance: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });
  return Accountdetails;
};