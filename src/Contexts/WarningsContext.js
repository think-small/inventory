import React, { createContext, useReducer } from "react";
import WarningsReducer from "../Reducers/WarningsReducer";

export const WarningsContext = createContext();

const WarningsContextProvider = props => {
  const initialState = {
    expire: [],
    lowQuantity: [],
    stale: []
  };
  const [warnings, dispatch] = useReducer(WarningsReducer, initialState);
  return (
    <WarningsContext.Provider value={{ warnings, dispatch }}>
      {props.children}
    </WarningsContext.Provider>
  );
};

export default WarningsContextProvider;
