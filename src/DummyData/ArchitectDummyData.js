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
    transaction.amount = Math.floor(Math.random() * 10);
  } else {
    transaction.numBoxesReceived = Math.floor(Math.random() * 10);
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
      quantity: 17,
      dateLastUsed: moment()
        .subtract(3, "days")
        .valueOf(),
      orderID: uuid(),
      transactions: [
        {
          type: "used",
          amount: 1,
          quantityInStock: 23,
          timestamp: moment()
            .subtract(22, "hours")
            .valueOf()
        },
        {
          type: "used",
          amount: 1,
          quantityInStock: 22,
          timestamp: moment()
            .subtract(1, "days")
            .valueOf()
        },
        {
          type: "used",
          amount: 2,
          quantityInStock: 20,
          timestamp: moment()
            .subtract({ days: 3, hours: 22, minute: 22 })
            .valueOf()
        },
        {
          type: "used",
          amount: 1,
          quantityInStock: 19,
          timestamp: moment()
            .subtract({ days: 3, hours: 10, minutes: 10 })
            .valueOf()
        },
        {
          type: "used",
          amount: 3,
          quantityInStock: 16,
          timestamp: moment()
            .subtract({ days: 2, hours: 5, minutes: 50 })
            .valueOf()
        },
        {
          type: "used",
          amount: 1,
          quantityInStock: 15,
          timestamp: moment()
            .subtract({ days: 1, hours: 21, minutes: 43 })
            .valueOf()
        },
        {
          type: "used",
          amount: 1,
          quantityInStock: 14,
          timestamp: moment()
            .subtract({ days: 1, hours: 2, minutes: 12 })
            .valueOf()
        },
        {
          type: "used",
          amount: 4,
          quantityInStock: 10,
          timestamp: moment()
            .subtract({ days: 1, hours: 1, minutes: 30 })
            .valueOf()
        },
        {
          type: "used",
          amount: 1,
          quantityInStock: 9,
          timestamp: moment()
            .subtract({ hours: 8, minutes: 57 })
            .valueOf()
        }
      ]
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
      quantity: 7,
      dateLastUsed: undefined,
      orderID: uuid(),
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
      dateLastUsed: undefined,
      orderID: uuid(),
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
      dateLastUsed: undefined,
      orderID: uuid(),
      transactions: [
        {
          type: "used",
          amount: 1,
          quantityInStock: 30,
          timestamp: moment()
            .subtract(30, "days")
            .valueOf()
        },
        {
          type: "used",
          amount: 2,
          quantityInStock: 28,
          timestamp: moment()
            .subtract({ days: 1, hours: 7, minutes: 29 })
            .valueOf()
        },
        {
          type: "used",
          amount: 5,
          quantityInStock: 23,
          timestamp: moment()
            .subtract(2, "days")
            .valueOf()
        }
      ]
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
      countPerBox: 8,
      quantity: 64,
      orderID: uuid(),
      transactions: [
        {
          type: "used",
          amount: 1,
          quantityInStock: 80,
          timestamp: moment()
            .subtract(30, "minutes")
            .valueOf()
        },
        {
          type: "used",
          amount: 5,
          quantityInStock: 75,
          timestamp: moment()
            .subtract({ days: 1, minutes: 392 })
            .valueOf()
        },
        {
          type: "used",
          amount: 10,
          quantityInStock: 65,
          timestamp: moment()
            .subtract({ days: 3, hours: 2, minutes: 172 })
            .valueOf()
        },
        {
          type: "used",
          amount: 5,
          quantityInStock: 55,
          timestamp: moment()
            .subtract({ weeks: 1, days: 5, hours: 22, minutes: 12 })
            .valueOf()
        },
        {
          type: "received",
          numBoxesReceived: 5,
          quantityInStock: 95,
          timestamp: moment()
            .subtract({ weeks: 1, days: 6, hours: 11 })
            .valueOf()
        },
        {
          type: "used",
          amount: 25,
          quantityInStock: 70,
          timestamp: moment()
            .subtract({ weeks: 2, days: 1, hours: 8, minutes: 21 })
            .valueOf()
        },
        {
          type: "used",
          amount: 6,
          quantityInStock: 64,
          timestamp: moment()
            .subtract({ weeks: 2, days: 5, hours: 10, minutes: 11 })
            .valueOf()
        }
      ]
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
  500
);
populateArray(architectDummyData.hepBsAgReagent[0].transactions, 500);
populateArray(architectDummyData.hepCAbReagent[0].transactions, 300);
populateArray(architectDummyData.rv[0].transactions, 700);
populateArray(architectDummyData.washBuffer[0].transactions, 200);
const now = moment().valueOf();

/**
 * This function updates each item with the appropriate "quantity" and "lastUsed" values.
 * It does so by doing the following:
 * 1) Determine if the item is the current lot
 * 2) If so, iterate through the transactions array and return an object with three properties:
 *    "used", "received", and "overall". "Used" references the last transaction of type "used".
 *    "Received" references the last transaction of type "received." Finally, "overall" references
 *    the last transaction regardless of type.
 * 3) The item's "quantity" property is set to overall.quantityInStock. Also, the item's "lastUsed"
 *    property is set to used.timestamp.
 * @param {Object[]} arr - array of current and new lot items.
 */

const populateItemData = arr => {
  arr.forEach(item => {
    if (item.isCurrentLot) {
      const lastTransaction = item.transactions.reduce(
        (acc, curr) => {
          if (curr.type === "used") {
            acc.used =
              now - curr.timestamp < now - acc.used.timestamp ? curr : acc.used;
          } else if (curr.type === "received") {
            acc.received =
              now - curr.timestamp < now - acc.received.timestamp
                ? curr
                : acc.received;
          }
          acc.overall =
            now - curr.timestamp < now - acc.overall.timestamp
              ? curr
              : acc.overall;
          return acc;
        },
        {
          used: {
            timestamp: moment()
              .unix()
              .valueOf()
          },
          received: {
            timestamp: moment()
              .unix()
              .valueOf()
          },
          overall: {
            timestamp: moment()
              .unix()
              .valueOf()
          }
        }
      );
      item.quantity = lastTransaction.overall.quantityInStock;
      item.lastUsed = lastTransaction.used.timestamp;
    }
  });
};
Object.values(architectDummyData).forEach(item => populateItemData(item));

export default architectDummyData;
