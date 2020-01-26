import WarningsReducer from "../../Reducers/WarningsReducer";
import moment from "moment";

let initialState;

beforeEach(() => {
  initialState = {
    expire: [{}, {}, {}],
    lowQuantity: [],
    stale: []
  };
});

test("Should add new object to expiring reagent warning array", () => {
  const data = {
    lotNum: "A2O-S2K",
    reagent: "metCleanSolution",
    timeToExpire: moment()
      .add(10, "months")
      .valueOf()
  };
  const warning = {
    type: "CREATE_EXPIRE_WARNING",
    data
  };
  const state = WarningsReducer(initialState, warning);
  expect(state).toEqual({
    ...initialState,
    expire: [...initialState.expire, data]
  });
});

test("Should add new object to lot quantity warning array", () => {
  const data = {
    lotNum: "29AKD-2KS98",
    reagent: "cal1Solution",
    quantity: 2
  };
  const warning = {
    type: "CREATE_LOW_QUANTITY_WARNING",
    data
  };
  const state = WarningsReducer(initialState, warning);
  expect(state).toEqual({
    ...initialState,
    lowQuantity: [...initialState.lowQuantity, data]
  });
});

test("Should add new object to stale warning array", () => {
  const data = {
    lotNum: "OWA-2LKS",
    reagent: "cal2Solution",
    lastUsed: moment()
      .subtract({ days: 1, hours: 20 })
      .valueOf()
  };
  const warning = {
    type: "CREATE_STALE_WARNING",
    data
  };
  const state = WarningsReducer(initialState, warning);
  expect(state).toEqual({
    ...initialState,
    stale: [...initialState.stale, data]
  });
});

test("Should clear expire warnings array", () => {
  const state = WarningsReducer(initialState, {
    type: "CLEAR_WARNINGS",
    data: { warningType: "expire" }
  });
  expect(state).toEqual({ ...state, expire: [] });
});
