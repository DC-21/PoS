module.exports = (sequelize, DataTypes) => {
  const Accountdetails = sequelize.define("Accountdetails", {
    accountname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountbalance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Accountdetails;
};
