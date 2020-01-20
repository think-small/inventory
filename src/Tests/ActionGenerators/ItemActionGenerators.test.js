import { createItemActionGenerator } from "../../ActionGenerators/ItemActionGenerators";
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
    orderID: uuid()
  };
  const newCreateAction = createItemActionGenerator(newItem);
  expect(newCreateAction).toEqual({
    type: "CREATE_ITEM",
    item: { ...newItem }
  });
});

test("Should generate create item action object - no arguments passed", () => {
  const newCreateAction = createItemActionGenerator();
  expect(newCreateAction).toEqual({
    type: "CREATE_ITEM",
    item: {
      name: "",
      lotNum: "",
      expirationDate: undefined,
      countPerBox: undefined,
      numBoxesReceived: undefined,
      quantityInStock: undefined,
      lastScan: undefined,
      orderID: ""
    }
  });
});
