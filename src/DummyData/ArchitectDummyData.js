import moment from "moment";
import uuid from "uuid";

const createTransaction = () => {
  const transactionType = ["used", "received"];
  const transaction = {
    type: transactionType[Math.floor(Math.random() * 2)],
    quantityInStock: Math.floor(Math.random() * 100),
    timestamp: moment()
      .subtract({ hours: Math.floor(Math.random() * 8760) })
      .valueOf()
  };
  if (transaction.type === "used") {
    transaction.amount = Math.floor(Math.random() * 6 + 1);
  } else {
    transaction.numBoxesReceived = Math.floor(Math.random() * 3 + 1);
  }
  return transaction;
};

const populateArray = (arr, length) => {
  while (arr.length < length) {
    arr.push(createTransaction());
  }
};

const architectDummyData = {
  hepBsAgReagent: [
    {
      displayName: "Hepatitis B Surface Antigen Reagent",
      lotNum: "OWSK-SLW3K",
      expirationDate: moment()
        .add({ years: 2, months: 11, days: 9 })
        .valueOf(),
      isCurrentLot: true,
      isNewLot: false,
      par: 4,
      countPerBox: 2,
      quantity: 8,
      lastUsed: moment()
        .subtract(3, "days")
        .valueOf(),
      orderID: uuid(),
      warnings: [],
      transactions: []
    },
    {
      displayName: "Hepatitis B Surface Antigen Reagent",
      lotNum: "FJX83L-SL",
      expirationDate: moment()
        .add({ years: 1, months: 10, days: 1 })
        .valueOf(),
      isCurrentLot: false,
      isNewLot: true,
      par: 4,
      countPerBox: 2,
      quantity: 10,
      lastUsed: undefined,
      orderID: uuid(),
      warnings: [],
      transactions: []
    }
  ],
  hepBNeutralizationReagent: [
    {
      displayName: "Hepatitis B Surface Antigen Neutralization Reagent",
      lotNum: "XDK-2LKS",
      expirationDate: moment()
        .add({ years: 2, months: 1, days: 18 })
        .valueOf(),
      isCurrentLot: true,
      isNewLot: false,
      par: 4,
      countPerBox: 2,
      quantity: 5,
      lastUsed: undefined,
      orderID: uuid(),
      warnings: [],
      transactions: []
    }
  ],
  hepCAbReagent: [
    {
      displayName: "Hepatitis C Antibody Reagent",
      lotNum: "ASK2-SKKIZ",
      expirationDate: moment()
        .add({ years: 1, months: 10, days: 1 })
        .valueOf(),
      isCurrentLot: true,
      isNewLot: false,
      par: 4,
      countPerBox: 2,
      quantity: 24,
      lastUsed: undefined,
      orderID: uuid(),
      warnings: [],
      transactions: []
    }
  ],
  rv: [
    {
      displayName: "Reaction Vessels",
      lotNum: "SLK32009SLK",
      expirationDate: undefined,
      isCurrentLot: true,
      isNewLot: false,
      par: 16,
      countPerBox: 2,
      quantity: 64,
      orderID: uuid(),
      lastUsed: undefined,
      warnings: [],
      transactions: []
    }
  ],
  washBuffer: [
    {
      displayName: "Concentrated Wash Buffer",
      lotNum: "AKDS-AK2KD",
      expirationDate: moment()
        .add({ years: 1, months: 3 })
        .valueOf(),
      isCurrentLot: true,
      isNewLot: false,
      par: 4,
      countPerBox: 2,
      quantity: 8,
      orderID: uuid(),
      lastUsed: undefined,
      warnings: [],
      transactions: [
        {
          type: "used",
          amount: 2,
          quantityInStock: 15,
          timestamp: moment()
            .subtract({ weeks: 1, days: 3 })
            .valueOf()
        },
        {
          type: "used",
          amount: 1,
          quantityInStock: 14,
          timestamp: moment()
            .subtract({ weeks: 1, days: 4 })
            .valueOf()
        },
        {
          type: "used",
          amount: 4,
          quantityInStock: 10,
          timestamp: moment()
            .subtract({ months: 1, weeks: 1, days: 2 })
            .valueOf()
        },
        {
          type: "used",
          amount: 2,
          quantityInStock: 8,
          timestamp: moment()
            .subtract({ months: 1, weeks: 2, days: 6 })
            .valueOf()
        }
      ]
    }
  ]
};

populateArray(
  architectDummyData.hepBNeutralizationReagent[0].transactions,
  200
);
populateArray(architectDummyData.hepBsAgReagent[0].transactions, 200);
populateArray(architectDummyData.hepCAbReagent[0].transactions, 200);
populateArray(architectDummyData.rv[0].transactions, 200);
populateArray(architectDummyData.washBuffer[0].transactions, 200);

Object.values(architectDummyData).forEach(itemArr => {
  const item = itemArr[0];

  item.transactions
    .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
    .forEach(transaction => {
      if (transaction.type === "used") {
        item.quantity -= transaction.amount;
        transaction.quantityInStock = item.quantity;
        item.lastUsed = transaction.timestamp;
      } else {
        item.quantity += transaction.numBoxesReceived * item.countPerBox;
        transaction.quantityInStock = item.quantity;
      }
      if (item.quantity < item.par) {
        const warning = {
          type: "LOW_QUANTITY",
          par: item.par,
          quantity: item.quantity,
          displayName: item.displayName,
          lotNum: item.lotNum,
          timestamp: item.lastUsed
        };
        item.warnings.push(warning);
      }
    });
});

export default architectDummyData;
