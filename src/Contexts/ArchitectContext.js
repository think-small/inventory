import React, { createContext, useReducer } from "react";
import ABLReducer from "../Reducers/ABLReducer";
import architectDummyData from "../DummyData/ArchitectDummyData";

export const ArchitectContext = createContext();

const ArchitectContextProvider = props => {
  const [architectItems, dispatch] = useReducer(ABLReducer, architectDummyData);
  return (
    <ArchitectContext.Provider value={{ architectItems, dispatch }}>
      {props.children}
    </ArchitectContext.Provider>
  );
};

export default ArchitectContextProvider;
