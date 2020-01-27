const ABLReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ITEM":
      const { name, details } = action.data;
      const arr = [];
      arr.push(details);
      return { ...state, [name]: arr };
    case "EDIT_ITEM":
      if (
        isValidNameCheck(state, action.data.name) &&
        isValidLotNumCheck(state, action.data) &&
        isValidUpdatePropertiesCheck(state, action.data)
      ) {
        return updateState(state, action, "EDIT");
      } else {
        return { ...state };
      }
    case "DELETE_TRANSACTION":
      if (
        isValidNameCheck(state, action.data.name) &&
        isValidLotNumCheck(state, action.data)
      ) {
        return updateState(state, action, "DELETE");
      } else {
        return { ...state };
      }
    default:
      return state;
  }
};

const updateState = (state, action, type) => {
  const targetItem = state[action.data.name].filter(
    item => item.lotNum === action.data.lotNum
  )[0];
  switch (type) {
    case "EDIT":
      const updatedEditItem = { ...targetItem, ...action.data.updates };
      return { ...state, [action.data.name]: [{ ...updatedEditItem }] };
    case "DELETE":
      const updatedDeleteItem = {
        ...targetItem,
        transactions: targetItem.transactions.filter(
          (_, index) => index !== action.data.index
        )
      };
      return { ...state, [action.data.name]: [{ ...updatedDeleteItem }] };
    default:
      return state;
  }
};

const isValidNameCheck = (state, name) => {
  return Object.keys(state).includes(name);
};

const isValidLotNumCheck = (state, { name, lotNum }) => {
  const arr = state[name].filter(item => item.lotNum === lotNum);
  return arr.length > 0;
};

const isValidUpdatePropertiesCheck = (state, { name, lotNum, updates }) => {
  const targetItemArr = state[name].filter(item => item.lotNum === lotNum);
  const checkedPropertiesArr = Object.keys(targetItemArr[0]);
  const updatePropertiesExistArr = Object.keys(updates).map(property =>
    checkedPropertiesArr.includes(property)
  );
  return updatePropertiesExistArr.every(bool => bool === true);
};

export default ABLReducer;
