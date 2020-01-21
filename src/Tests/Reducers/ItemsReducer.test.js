import ItemsReducer from "../../Reducers/ItemsReducer";
import items from "../data/items";
import moment from "moment";

test("Should add new item to state", () => {
  const newItem = {
    name: "newItem",
    lotNum: "2398SLK-23KSDI",
    expirationDate: moment()
      .add(1, "year")
      .fromNow(),
    countPerBox: 5,
    numBoxesReceived: 1,
    quantityInStock: 20,
    lastScan: moment()
      .subtract(5, "days")
      .fromNow(),
    orderID: "r0fld00d",
    isCurrentLot: true,
    isNewLot: false,
    id: "hahah0h0h3h3"
  };
  const state = ItemsReducer(items, {
    type: "CREATE_ITEM_TRANSACTION",
    data: {
      item: newItem
    }
  });
  expect(state).toEqual([...items, newItem]);
});

test("Should edit single property", () => {
  const index = 1;
  const name = "ROFLcopter";
  const orderID = items[index].orderID;
  const state = ItemsReducer(items, {
    type: "EDIT_ITEM_TRANSACTION",
    data: {
      orderID,
      updates: {
        name
      }
    }
  });
  expect(state[index].name).toBe(name);
});

test("Should edit multiple properties", () => {
  const index = 2;
  const name = "YEESH";
  const isCurrentLot = false;
  const isNewLot = true;
  const orderID = items[index].orderID;
  const state = ItemsReducer(items, {
    type: "EDIT_ITEM_TRANSACTION",
    data: {
      orderID,
      updates: { name, isCurrentLot, isNewLot }
    }
  });
  expect(state[index].name).toBe(name);
  expect(state[index].isCurrentLot).toBe(isCurrentLot);
  expect(state[index].isNewLot).toBe(isNewLot);
});

test("Should not change state if edit action object has invalid orderID", () => {
  const orderID = "Thi5 i5 w|20nG";
  const lotNum = "w00t";
  const state = ItemsReducer(items, {
    type: "EDIT_ITEM_TRANSACTION",
    data: {
      orderID,
      updates: { lotNum }
    }
  });
  expect(state).toEqual(items);
});

test("Should delete single item transaction", () => {
  const id = items[0].id;
  const state = ItemsReducer(items, {
    type: "DELETE_ITEM_TRANSACTION",
    data: { id }
  });
  expect(state).toEqual(items.filter(item => item.id !== id));
});
