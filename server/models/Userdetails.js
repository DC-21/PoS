module.exports = (sequelize, DataTypes)=>{
    const Userdetails = sequelize.define("Userdetails", {
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Userdetails;
};