const moment = require("moment");
const transaction = require("../Data/models/index").transaction;

const QUANTITY_FLUCTUATION_LIMIT = 40;
const transactionTypes = ["used", "received"];
const dateTimeFormat = "YYYY-MM-DD hh:mm:ss";

const generateRandomTransactions = async ({ totalTransactions, startingQuantity, endingQuantity, itemId, lotNum, countPerBox }) => {
    const generateAmountBasedOn = quantityFluctuation => {
        const amountLimit = 10;
        const baseAmount = Math.floor((Math.random() * amountLimit) + 1);
        if (quantityFluctuation > QUANTITY_FLUCTUATION_LIMIT ||
            quantityFluctuation < -QUANTITY_FLUCTUATION_LIMIT) {
            return (Math.abs(quantityFluctuation) + baseAmount);
        }
        return baseAmount;
    }

    const output = [];
    let currentQuantity = startingQuantity;
    let lowerDateTime = 8760, upperDateTime;
    const dateTimeRange = Math.floor(lowerDateTime / totalTransactions);
    let previousDateTime = moment().subtract({ years: 1, months: 1 });

    while (output.length < totalTransactions) {
        const quantityFluctuation = currentQuantity - endingQuantity;
        const transactionType = generateTypeBasedOn(currentQuantity);
        const amount = generateAmountBasedOn(quantityFluctuation);
        const boxesReceived = Math.ceil(amount / countPerBox);

        currentQuantity = transactionType === "used" ? currentQuantity - amount : currentQuantity + boxesReceived * countPerBox;
        upperDateTime = lowerDateTime - dateTimeRange;
        const createdAt = generateDateTime(previousDateTime, lowerDateTime, upperDateTime).format(dateTimeFormat);
        const newTransaction = transaction.create({
            itemId,
            lotNum,
            transactionType,
            quantityInStock: currentQuantity,
            amount: transactionType === "used" ? amount : 0,
            numBoxesReceived: transactionType === "received" ? boxesReceived : 0,
            createdAt,
            updatedAt: moment().format(dateTimeFormat)
        });
        output.push(newTransaction);
        lowerDateTime -= dateTimeRange;
        previousDateTime = createdAt;
    }
    return await Promise.all(output);
}

const generateTypeBasedOn = (currentQuantity) => {
    if (currentQuantity > QUANTITY_FLUCTUATION_LIMIT) return "used";
    else if (currentQuantity < -QUANTITY_FLUCTUATION_LIMIT) return "received";
    else return transactionTypes[Math.floor(Math.random() * 2)]
}
const generateDateTime = (previousDateTime, lowerLimit, upperLimit) => {
    let output = moment().subtract({ years: 2 });
    while (output.isBefore(previousDateTime)) {
        output = moment().subtract({ hours: Math.floor(Math.random() * (lowerLimit - upperLimit + 1)) + upperLimit});
    }
    return output;
}

module.exports = generateRandomTransactions;