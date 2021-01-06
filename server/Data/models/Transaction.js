module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("transaction",{
        lotNum: DataTypes.STRING(100),
        transactionType: {
            type: DataTypes.STRING(10),
            validate: {
                isIn: [["received", "used"]]
            }
        },
        amount: DataTypes.INTEGER,
        numBoxesReceived: DataTypes.INTEGER,
        quantityInStock: DataTypes.INTEGER
    });
    Transaction.associate = models => {
        Transaction.belongsTo(models.item);
    }

    return Transaction;
}
