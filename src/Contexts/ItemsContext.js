import React, { createContext, useReducer } from "react";
import ItemsReducer from "../Reducers/ItemsReducer";
import moment from "moment";
import uuid from "uuid";

export const ItemsContext = createContext();

const ItemsContextProvider = props => {
  const dummyData = [
    {
      name: "Calibration Solution 1",
      lotNum: "A293-B2380S",
      expirationDate: moment()
        .add(700, "days")
        .fromNow(),
      countPerBox: 4,
      numBoxesReceived: null,
      quantityInStock: 16,
      lastScan: moment()
        .subtract(3, "days")
        .fromNow(),
      orderID: uuid(),
      isCurrentLot: true,
      isNewLot: false
    },
    {
      name: "Calibration Solution 2",
      lotNum: "T238SSK-298SKDS1",
      expirationDate: moment()
        .add(365, "days")
        .fromNow(),
      countPerBox: 4,
      numBoxesReceived: null,
      quantityInStock: 11,
      lastScan: moment()
        .subtract(10, "days")
        .fromNow(),
      orderID: uuid(),
      isCurrentLot: false,
      isNewLot: true
    },
    {
      name: "AutoCheck Level 1",
      lotNum: "3982IZ3829",
      expirationDate: moment()
        .add(180, "days")
        .fromNow(),
      countPerBox: 8,
      numBoxesReceived: null,
      quantityInStock: 60,
      lastScan: moment()
        .subtract(7, "days")
        .fromNow(),
      orderID: uuid(),
      isCurrentLot: true,
      isNewLot: false
    }
  ];
  const [items, dispatch] = useReducer(ItemsReducer, dummyData);

  return (
    <ItemsContext.Provider value={{ items, dispatch }}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextProvider;
