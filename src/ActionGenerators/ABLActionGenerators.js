export const addABLItem = (
  { name, details } = {
    name: undefined,
    details: {
      displayName: "",
      lotNum: "",
      expirationDate: undefined,
      isCurrentLot: undefined,
      isNewLot: undefined,
      par: undefined,
      countPerBox: undefined,
      quantity: undefined,
      dateLastUsed: undefined,
      orderID: undefined,
      transactions: []
    }
  }
) => {
  return {
    type: "CREATE_ITEM",
    data: { name, details }
  };
};

export const editABLItem = ({ name, lotNum, updates }) => {
  return {
    type: "EDIT_ITEM",
    data: { name, lotNum, updates }
  };
};

export const deleteABLtransaction = ({ name, lotNum, index }) => {
  return {
    type: "DELETE_TRANSACTION",
    data: { name, lotNum, index }
  };
};
