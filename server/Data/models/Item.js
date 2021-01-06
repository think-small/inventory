module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("item", {
        reagentName: DataTypes.STRING(50),
        displayName: DataTypes.STRING(100),
        lotNum: DataTypes.STRING(100),
        quantity: DataTypes.INTEGER,
        isCurrentLot: DataTypes.BOOLEAN,
        isNewLot: DataTypes.BOOLEAN,
        par: DataTypes.INTEGER,
        countPerBox: DataTypes.INTEGER,
        expirationDate: DataTypes.DATE,
        orderID: DataTypes.STRING(100),
    });

    Item.associate = models => {
        Item.belongsTo(models.instrument);
        Item.hasMany(models.transaction);
    }

    return Item;
};