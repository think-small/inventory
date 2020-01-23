import data from "../../DummyData/ABLDummyData";
import ABLReducer from "../../Reducers/ABLReducer";
import uuid from "uuid";
import moment from "moment";

//  Create ABL Item Tests
test("Should create new item with name as new property on state object - all arguments passed into addABLItem", () => {
  const name = "ROFLcopter";
  const newItem = {
    name,
    details: {
      displayName: "ACME Products",
      lotNum: "F38X-SLK3",
      expirationDate: moment()
        .add({ years: 1, months: 10, days: 1 })
        .valueOf(),
      isCurrentLot: false,
      isNewLot: true,
      par: 8,
      countPerBox: 4,
      numBoxesReceived: undefined,
      quantity: 24,
      dateLastUsed: undefined,
      orderID: uuid(),
      transactions: []
    }
  };
  const detailsArray = [];
  detailsArray.push(newItem.details);
  const state = ABLReducer(data, {
    type: "CREATE_ITEM",
    data: newItem
  });
  expect(state).toEqual({ ...state, [name]: detailsArray });
});

test("Should create new item with name as new property on state object - no arguments passed to addABLItem", () => {
  const name = "";
  const displayName = "";
  const defaultItem = {
    name,
    details: {
      displayName,
      lotNum: "",
      expirationDate: undefined,
      isCurrentLot: undefined,
      isNewLot: undefined,
      par: undefined,
      countPerBox: undefined,
      numBoxesReceived: undefined,
      quantity: undefined,
      dateLastUsed: undefined,
      orderID: undefined,
      transactions: []
    }
  };
  const detailsArr = [];
  detailsArr.push(undefined);
  const state = ABLReducer(data, {
    type: "CREATE_ITEM",
    data: detailsArr
  });
  expect(state).toEqual({ ...data, undefined: detailsArr });
});

//  Edit ABL Item Tests
test("Should edit single property", () => {
  const name = Object.keys(data)[0];
  const lotNum = Object.values(data[name])[0].lotNum;
  const updates = {
    par: 9999999
  };
  const state = ABLReducer(data, {
    type: "EDIT_ITEM",
    data: { name, lotNum, updates }
  });
  expect(state[name].filter(item => item.lotNum === lotNum)[0].par).toBe(
    updates.par
  );
});

test("Should edit multiple properties", () => {
  const name = Object.keys(data)[0];
  const lotNum = Object.values(data[name])[0].lotNum;
  const updates = {
    countPerBox: 29382,
    quantity: 1983829821,
    isNewLot: true,
    isCurrentLot: false
  };
  const state = ABLReducer(data, {
    type: "EDIT_ITEM",
    data: { name, lotNum, updates }
  });
  expect(state[name].filter(item => item.lotNum === lotNum)[0]).toEqual({
    ...data[name].filter(item => item.lotNum === lotNum)[0],
    ...updates
  });
});

test("Should return original state if given name is invalid", () => {
  const name = "NOT AN ITEM";
  const lotNum = "2FJ20-ZLD";
  const updates = {
    par: 1
  };
  const state = ABLReducer(data, {
    type: "EDIT_ITEM",
    data: { name, lotNum, updates }
  });
  expect(state).toEqual(data);
});

test("Should return original state if given lotNum is invalid", () => {
  const name = Object.keys(data)[0];
  const lotNum = "NOT GONNA W0rk";
  const updates = {
    par: 1
  };
  const state = ABLReducer(data, {
    type: "EDIT_ITEM",
    data: { name, lotNum, updates }
  });
  expect(state).toEqual(data);
});

test("Should return original state if given update properties don't exist", () => {
  const name = Object.keys(data)[0];
  const lotNum = Object.values(data[name])[0].lotNum;
  const updates = {
    notAValidProp: "Return",
    alsoNotValid: "Original",
    defNotValid: "State"
  };
  const state = ABLReducer(data, {
    type: "EDIT_ITEM",
    data: { name, lotNum, updates }
  });
  expect(state).toEqual(data);
});

//  Delete ABL Item Transaction Tests
test("Should remove element from transaction array for cal1Solution (current lot)", () => {
  const name = "cal1Solution";
  const lotNum = "FD20S-SK2";
  const index = 0;
  const state = ABLReducer(data, {
    type: "DELETE_TRANSACTION",
    data: { name, lotNum, index }
  });
  expect(
    state[name].filter(item => item.lotNum === lotNum)[0].transactions
  ).toHaveLength(2);
});

test("Should return original state if given name is invalid", () => {
  const name = "N0tV4l|d";
  const lotNum = "FD20S-SK2";
  const index = 0;
  const state = ABLReducer(data, {
    type: "DELETE_TRANSACTION",
    data: { name, lotNum, index }
  });
  expect(state).toEqual(data);
});

test("Should return original state if given lotNum is invalid", () => {
  const name = "cal1Solution";
  const lotNum = "n0t-4-|234L-numb4";
  const index = 0;
  const state = ABLReducer(data, {
    type: "DELETE_TRANSACTION",
    data: { name, lotNum, index }
  });
  expect(state).toEqual(data);
});
