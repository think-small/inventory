const { Sequelize, DataTypes } = require("sequelize");
const db = require("../../db");

const ABL = Sequelize.define("abl", {
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
    freezeTableName: true
});

export default ABL;