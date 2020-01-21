import {
  createItemTransaction,
  editItemTransaction,
  deleteItemTransaction
} from "../../ActionGenerators/ItemActionGenerators";
import items from "../data/items";
import moment from "moment";
import uuid from "uuid";

//  Tests for createItemActionGenerator
test("Should generate create item action object - passing in object with all necessary properties", () => {
  const newItem = {
    name: "TestItem",
    lotNum: "T35t-l0t-numb312",
    expirationDate: moment()
      .add(1, "year")
      .fromNow(),
    countPerBox: 12,
    numBoxesReceived: 2,
    quantityInStock: 36,
    lastScan: moment()
      .subtract(1, "day")
      .fromNow(),
    orderID: uuid(),
    isCurrentLot: true,
    isNewLot: false
  };
  const newCreateAction = createItemTransaction(newItem);
  expect(newCreateAction).toEqual({
    type: "CREATE_ITEM_TRANSACTION",
    data: {
      item: newItem
    }
  });
});

test("Should generate create item action object - no arguments passed", () => {
  const newCreateAction = createItemTransaction();
  expect(newCreateAction).toEqual({
    type: "CREATE_ITEM_TRANSACTION",
    data: {
      item: {
        name: "",
        lotNum: "",
        expirationDate: undefined,
        countPerBox: undefined,
        numBoxesReceived: undefined,
        quantityInStock: undefined,
        lastScan: undefined,
        orderID: "",
        isCurrentLot: undefined,
        isNewLot: undefined
      }
    }
  });
});

test("Should generate edit item action object", () => {
  const name = "ROFLcopter";
  const orderID = items[0].orderID;
  const updates = { name };
  const newEditAction = editItemTransaction({ orderID, updates });
  expect(newEditAction).toEqual({
    type: "EDIT_ITEM_TRANSACTION",
    data: { orderID, updates }
  });
});

test("Should generate delete item transaction action object", () => {
  const id = items[2].id;
  const newDeleteTransactionActionObject = deleteItemTransaction(id);
  expect(newDeleteTransactionActionObject).toEqual({
    type: "DELETE_ITEM_TRANSACTION",
    data: { id }
  });
});
