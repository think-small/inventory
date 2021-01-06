'use strict';
const models = require("../models/index");
const generateTransactions = require("../../Utility/generate-random-transactions");
const moment = require("moment");
const dateTimeFormat = "YYYY-MM-DD hh:mm:ss";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("instruments", [
      {
        name: "Architect",
        displayName: "Architect i2000sr",
        manufacturer: "Abbott",
        serviceHotline: "1-800-RVS-JAMD",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
      },
      {
        name: "ABL",
        displayName: "ABL 825",
        manufacturer: "Radiometer",
        serviceHotline: "1-800-CAL-FAIL",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
      }
    ]);
    const architectId = await models.instrument.findOne({ name: "Architect" });
    const abl = await models.instrument.findOne({ where: { name: "ABL" } });
    const ablId = abl.id;

    await queryInterface.bulkInsert("items", [
      {
        reagentName: "Cal1Solution",
        displayName: "Cal 1 Solution",
        lotNum: "SLK298SKLA",
        quantity: 20,
        isCurrentLot: true,
        isNewLot: false,
        par: 8,
        countPerBox: 4,
        expirationDate: moment().add({ years: 2, months: 3, days: 27 }).format(dateTimeFormat),
        orderId: "SLK2908-29AJK-2JK",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      },
      {
        reagentName: "Cal2Solution",
        displayName: "Cal 2 Solution",
        lotNum: "WOISLK209S9KJ",
        quantity: 22,
        isCurrentLot: true,
        isNewLot: false,
        par: 8,
        countPerBox: 4,
        expirationDate: moment().add({ years: 1, months: 10, days: 8 }).format(dateTimeFormat),
        orderId: "QOIXS-KL2-ZLK2",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      },
      {
        reagentName: "AutoCheck2",
        displayName: "AutoCheck Level 2",
        lotNum: "104",
        quantity: 47,
        isCurrentLot: true,
        isNewLot: false,
        par: 4,
        countPerBox: 8,
        expirationDate: moment().add({ years: 2, months: 1, days: 11 }).format(dateTimeFormat),
        orderId: "SLK298REKJ-LKW-ZLQPI",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      },
      {
        reagentName: "AutoCheck1",
        displayName: "AutoCheck Level 1",
        lotNum: "171",
        quantity: 33,
        isCurrentLot: true,
        isNewLot: false,
        par: 4,
        countPerBox: 8,
        expirationDate: moment().add({ months: 11, days: 17 }).format(dateTimeFormat),
        orderId: "OPQL9-SL19-ZK9",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      },
      {
        reagentName: "AutoCheck1",
        displayName: "AutoCheck Level 1",
        lotNum: "172",
        quantity: 40,
        isCurrentLot: false,
        isNewLot: true,
        par: 4,
        countPerBox: 8,
        expirationDate: moment().add({ years: 1,  months: 5, days: 9 }).format(dateTimeFormat),
        orderId: "WIO2-SLKZ-2LKSD92",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      },
      {
        reagentName: "GlucoseMembrane",
        displayName: "Glucose Membrane",
        lotNum: "29PSLK",
        quantity: 7,
        countPerBox: 4,
        par: 2,
        isCurrentLot: true,
        isNewLot: false,
        expirationDate: moment().add({ years: 2, months: 5, days: 26 }).format(dateTimeFormat),
        orderId: "WOIS-2LK98",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      },
      {
        reagentName: "CO2Membrane",
        displayName: "CO2 Membrane",
        lotNum: "2O9DKA1IO",
        quantity: 5,
        countPerBox: 4,
        par: 2,
        isCurrentLot: true,
        isNewLot: false,
        expirationDate: moment().add({ years: 3, months: 4, days: 2 }).format(dateTimeFormat),
        orderId: "SO29SDK",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      },
      {
        reagentName: "RinseSolution",
        displayName: "Rinse Solution",
        lotNum: "KL290EJK",
        quantity: 30,
        countPerBox: 2,
        par: 20,
        isCurrentLot: true,
        isNewLot: false,
        expirationDate: moment().add({ years: 5, months: 1, days: 1 }).format(dateTimeFormat),
        orderId: "XM198",
        createdAt: moment().format(dateTimeFormat),
        updatedAt: moment().format(dateTimeFormat),
        instrumentId: ablId
      }
    ]);

    //  using queryInterface.bulkInsert() is not necessary for seeding "transaction" table
    //  because generateTransactions() invokes transaction.create() as it randomly generates
    //  transactions.
    const items = await models.item.findAll();
    const transactionPromises = items
        .map(({ quantity, id, lotNum, countPerBox }) => generateTransactions({totalTransactions: 500, startingQuantity: 10, endingQuantity: quantity, itemId: id, lotNum, countPerBox }))
        .flat();
    await Promise.all(transactionPromises);

    //  each item's "quantity" property reveals how much of that item is in stock.
    //  The value for quantity must be manually set by getting the item's last transaction
    //  and looking up its "quantityInStock" value.
    //  The alternative is to force the final transaction to use/receive enough units to get
    //  to a pre-defined ending value. However, this won't be feasible in the case that
    //  currentQuantity - endingQuantity % countPerBox !== 0
    const ablInstrument = await models.instrument.findOne({ where: { name: "ABL" }});
    const instrumentId = ablInstrument.id;
    const ablItemsWithTransactions = await models.item.findAll({
      where: {
        instrumentId
      },
      include: [{
        model: models.transaction
      }]
    });

    for (const item of ablItemsWithTransactions) {
      const finalTransactionId = Math.max(...item.transactions.map(transaction => transaction.id));
      const finalQuantityInStock = item.transactions.find(t => t.id === finalTransactionId).quantityInStock;
      await item.update({
        quantity: finalQuantityInStock
      });
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Instruments", null, {});
    await queryInterface.bulkDelete("Items", null, {});
    return queryInterface.bulkDelete("Transactions", null, {});
  }
};
