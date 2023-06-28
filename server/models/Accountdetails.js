module.exports = (sequelize, DataTypes)=>{
    const Accountdetails = sequelize.define("Accountdetails", {
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
    return Accountdetails;
};