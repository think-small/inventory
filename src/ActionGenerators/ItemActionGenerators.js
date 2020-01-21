import uuid from "uuid";

export const createItemTransaction = (
  {
    name,
    lotNum,
    expirationDate,
    countPerBox,
    numBoxesReceived,
    quantityInStock,
    lastScan,
    orderID,
    isCurrentLot,
    isNewLot
  } = {
    name: "",
    lotNum: "",
    expirationDate: undefined,
    countPerBox: undefined,
    numBoxesReceived: undefined,
    quantityInStock: undefined,
    lastScan: undefined,
    orderID: "",
    isCurrentLot: undefined,
    isNewLot: undefined,
    id: uuid()
  }
) => {
  return {
    type: "CREATE_ITEM_TRANSACTION",
    data: {
      item: {
        name,
        lotNum,
        expirationDate,
        countPerBox,
        numBoxesReceived,
        quantityInStock,
        lastScan,
        orderID,
        isCurrentLot,
        isNewLot
      }
    }
  };
};

export const editItemTransaction = ({ orderID, updates }) => {
  return {
    type: "EDIT_ITEM_TRANSACTION",
    data: { orderID, updates }
  };
};

export const deleteItemTransaction = id => {
  return {
    type: "DELETE_ITEM_TRANSACTION",
    data: { id }
  };
};
