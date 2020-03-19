import moment from "moment";

const dummyData = [
  {
    id: 1,
    displayName: "Hepatitis B Surface Antigen",
    reagentName: "hepBsAg",
    lotNum: "ABC-123",
    quantity: 1,
    isCurrentLot: 1,
    isNewLot: 0,
    par: 4,
    countPerBox: 2,
    expirationDate: moment().add({ years: 1 }),
    orderID: "123ABC",
    transactions: [
      {
        id: 1,
        lotNum: "ABC-123",
        transactionType: "received",
        amount: undefined,
        numBoxesReceived: 1,
        quantityInStock: 3,
        timestamp: moment().valueOf()
      },
      {
        id: 2,
        lotNum: "ABC-123",
        transactionType: "used",
        amount: 2,
        numBoxesReceived: undefined,
        quantityInStock: 1,
        timestamp: moment()
          .add({ days: 1 })
          .valueOf()
      }
    ]
  },
  {
    id: 2,
    displayName: "Hepatitis B Surface Antigen",
    reagentName: "hepBsAg",
    lotNum: "CBA-321",
    quantity: 2,
    isCurrentLot: 0,
    isNewLot: 1,
    par: 4,
    countPerBox: 2,
    expirationDate: moment().add({ years: 2 }),
    orderID: "CBA321",
    transactions: [
      {
        id: 1,
        lotNum: "CBA-321",
        transactionType: "received",
        amount: undefined,
        numBoxesReceived: 1,
        quantityInStock: 2,
        timestamp: moment().valueOf()
      }
    ]
  },
  {
    id: 3,
    displayName: "Reaction Vessels",
    reagentName: "rv",
    lotNum: "rv123",
    quantity: 10,
    isCurrentLot: 1,
    isNewLot: 0,
    par: 6,
    countPerBox: 4,
    expirationDate: moment().add({ years: 3 }),
    orderID: "rv-123",
    transactions: [
      {
        id: 1,
        lotNum: "rv123",
        transactionType: "received",
        amount: undefined,
        numBoxesReceived: 3,
        quantityInStock: 12,
        timestamp: moment()
          .subtract({ days: 2 })
          .valueOf()
      },
      {
        id: 2,
        lotNum: "rv123",
        transactionType: "used",
        amount: 2,
        numBoxesReceived: undefined,
        quantityInStock: 10,
        timestamp: moment()
          .subtract({ days: 1 })
          .valueOf()
      }
    ]
  }
];

export default dummyData;
