import moment from "moment";
import uuid from "uuid";

const dummyData = [
  {
    name: "Calibration Solution 1",
    lotNum: "A293-B2380S",
    expirationDate: moment()
      .add(700, "days")
      .fromNow(),
    countPerBox: 4,
    numBoxesReceived: null,
    quantityInStock: 16,
    lastScan: moment()
      .subtract(3, "days")
      .fromNow(),
    orderID: uuid()
  },
  {
    name: "Calibration Solution 2",
    lotNum: "T238SSK-298SKDS1",
    expirationDate: moment()
      .add(365, "days")
      .fromNow(),
    countPerBox: 4,
    numBoxesReceived: null,
    quantityInStock: 11,
    lastScan: moment()
      .subtract(10, "days")
      .fromNow(),
    orderID: uuid()
  },
  {
    name: "AutoCheck Level 1",
    lotNum: "3982IZ3829",
    expirationDate: moment()
      .add(180, "days")
      .fromNow(),
    countPerBox: 8,
    numBoxesReceived: null,
    quantityInStock: 60,
    lastScan: moment()
      .subtract(7, "days")
      .fromNow(),
    orderID: uuid()
  }
];

export default dummyData;
