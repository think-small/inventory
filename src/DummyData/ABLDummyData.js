import moment from "moment";
import uuid from "uuid";

const ablDummyData = {
  cal1Solution: [
    {
      lotNum: "FD20S-SK2",
      expirationDate: moment()
        .add({ years: 1, months: 2, days: 12 })
        .valueOf(),
      isCurrentLot: true,
      isNewLot: false,
      par: 8,
      countPerBox: 4,
      numBoxesReceived: undefined,
      quantity: 32,
      dateLastUsed: moment()
        .subtract(3, "days")
        .valueOf(),
      orderID: uuid(),
      transactions: [
        moment()
          .subtract(22, "hours")
          .valueOf(),
        moment()
          .subtract(1, "days")
          .valueOf(),
        moment()
          .subtract({ days: 3, hours: 22, minute: 22 })
          .valueOf()
      ]
    },
    {
      lotNum: "F38X-SLK3",
      expirationDate: moment()
        .add({ years: 1, months: 10, days: 1 })
        .valueOf(),
      isCurrentLot: false,
      isNewLot: true,
      par: 8,
      countPerBox: 4,
      numBoxesReceived: undefined,
      quantity: 24,
      dateLastUsed: undefined,
      orderID: uuid(),
      transactions: []
    }
  ],
  cal2Solution: [
    {
      lotNum: "XOSLW-A2KD",
      expirationDate: moment()
        .add({ years: 2, months: 1, days: 18 })
        .valueOf(),
      isCurrentLot: true,
      isNewLot: false,
      par: 8,
      countPerBox: 4,
      numBoxesReceived: undefined,
      quantity: 16,
      dateLastUsed: undefined,
      orderID: uuid(),
      transactions: [
        moment()
          .subtract(92, "hours")
          .valueOf(),
        moment().subtract({ weeks: 1, hours: 21 })
      ]
    }
  ],
  metCleanSolution: [
    {
      lotNum: "F38X-SLK3",
      expirationDate: moment()
        .add({ years: 1, months: 10, days: 1 })
        .valueOf(),
      isCurrentLot: true,
      isNewLot: false,
      par: 8,
      countPerBox: 4,
      numBoxesReceived: undefined,
      quantity: 24,
      dateLastUsed: undefined,
      orderID: uuid(),
      transactions: [
        moment()
          .subtract(30, "days")
          .valueOf(),
        moment()
          .subtract({ days: 1, hours: 7, minutes: 29 })
          .valueOf(),
        moment()
          .subtract(2, "days")
          .valueOf()
      ]
    }
  ]
};

export default ablDummyData;
