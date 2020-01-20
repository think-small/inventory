import uuid from "uuid";

export const createItemActionGenerator = (
  {
    name,
    lotNum,
    expirationDate,
    countPerBox,
    numBoxesReceived,
    quantityInStock,
    lastScan,
    orderID
  } = {
    name: "",
    lotNum: "",
    expirationDate: undefined,
    countPerBox: undefined,
    numBoxesReceived: undefined,
    quantityInStock: undefined,
    lastScan: undefined,
    orderID: "",
    id: uuid()
  }
) => {
  return {
    type: "CREATE_ITEM",
    item: {
      name,
      lotNum,
      expirationDate,
      countPerBox,
      numBoxesReceived,
      quantityInStock,
      lastScan,
      orderID
    }
  };
};
