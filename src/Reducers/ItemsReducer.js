import uuid from "uuid";

const ItemsReducer = (state, action) => {
  const {
    name,
    lotNum,
    expirationDate,
    countPerBox,
    numBoxesReceived,
    quantityInStock,
    lastScan,
    orderID,
    id
  } = action.item;
  switch (action.type) {
    case "CREATE_ITEM":
      return [
        ...state,
        {
          name,
          lotNum,
          expirationDate,
          countPerBox,
          numBoxesReceived,
          quantityInStock,
          lastScan,
          orderID,
          id
        }
      ];
    default:
      return state;
  }
};

export default ItemsReducer;
