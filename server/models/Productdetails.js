module.exports = (sequelize, DataTypes)=>{
    const Productdetails = sequelize.define("Productdetails", {
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
    return Productdetails;
};