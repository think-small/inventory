const WarningsReducer = (state, action) => {
  const { reagent, lotNum } = action.data;
  switch (action.type) {
    case "CREATE_EXPIRE_WARNING":
      const { timeToExpire } = action.data;
      const updatedExpireWarning = { reagent, lotNum, timeToExpire };
      return { ...state, expire: [...state.expire, updatedExpireWarning] };
    case "CREATE_LOW_QUANTITY_WARNING":
      const { quantity } = action.data;
      const updatedLowQuantityWarning = { reagent, lotNum, quantity };
      return {
        ...state,
        lowQuantity: [...state.lowQuantity, updatedLowQuantityWarning]
      };
    case "CREATE_STALE_WARNING":
      const { lastUsed } = action.data;
      const updatedStaleWarning = { reagent, lotNum, lastUsed };
      return { ...state, stale: [...state.stale, updatedStaleWarning] };
    case "CLEAR_WARNINGS":
      return { ...state, [action.data.warningType]: [] };
    default:
      return state;
  }
};

export default WarningsReducer;
