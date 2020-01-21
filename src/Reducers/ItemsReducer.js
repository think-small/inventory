import uuid from "uuid";

const ItemsReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ITEM_TRANSACTION":
      const {
        name,
        lotNum,
        expirationDate,
        countPerBox,
        numBoxesReceived,
        quantityInStock,
        lastScan,
        orderID,
        isCurrentLot,
        isNewLot,
        id
      } = action.data.item;
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
          isCurrentLot,
          isNewLot,
          id
        }
      ];
    case "EDIT_ITEM_TRANSACTION":
      return state.map(item => {
        if (item.orderID === action.data.orderID) {
          return { ...item, ...action.data.updates };
        } else {
          return item;
        }
      });
    case "DELETE_ITEM_TRANSACTION":
      return state.filter(item => item.id !== action.data.id);
    default:
      return state;
  }
};

export default ItemsReducer;
