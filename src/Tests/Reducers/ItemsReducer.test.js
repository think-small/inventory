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
    id: "hahah0h0h3h3"
  };
  const state = ItemsReducer(items, {
    type: "CREATE_ITEM",
    item: { ...newItem }
  });
  expect(state).toEqual([...items, newItem]);
});
