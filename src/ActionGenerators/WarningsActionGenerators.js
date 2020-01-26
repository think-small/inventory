export const createExpringWarning = ({
  instrument,
  reagent,
  lotNum,
  timeToExpire
}) => {
  return {
    type: "CREATE_EXPIRE_WARNING",
    data: { instrument, reagent, lotNum, timeToExpire }
  };
};

export const createLotQuantityWarning = ({
  instrument,
  reagent,
  lotNum,
  quantity
}) => {
  return {
    type: "CREATE_LOW_QUANTITY_WARNING",
    data: { instrument, reagent, lotNum, quantity }
  };
};

export const createStaleWarning = ({
  instrument,
  reagent,
  lotNum,
  lastUsed
}) => {
  return {
    type: "CREATE_STALE_WARNING",
    data: { instrument, reagent, lotNum, lastUsed }
  };
};

export const clearWarnings = ({ warningType }) => {
  return {
    type: "CLEAR_WARNINGS",
    data: { warningType }
  };
};
