import React from "react";
import ReactDOM from "react-dom";
import Router from "./Routers/Router";
import ItemsContextProvider from "./Contexts/ItemsContext";
import "./styles/styles.scss";

const App = () => (
  <ItemsContextProvider>
    <Router />
  </ItemsContextProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
