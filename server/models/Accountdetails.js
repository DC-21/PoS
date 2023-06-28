module.exports = (sequelize, DataTypes)=>{
  const Accountdetails = sequelize.define("Accountdetails", {
      accountname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
  return Accountdetails;
};