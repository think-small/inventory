import React, { createContext, useReducer } from "react";
import ABLReducer from "../Reducers/ABLReducer";
import ablDummyData from "../DummyData/ablDummyData";

export const ABLContext = createContext();

const ABLContextProvider = props => {
  const [ablItems, dispatch] = useReducer(ABLReducer, ablDummyData);
  return (
    <ABLContext.Provider value={{ ablItems, dispatch }}>
      {props.children}
    </ABLContext.Provider>
  );
};

export default ABLContextProvider;
