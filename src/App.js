import React from "react";
import ReactDOM from "react-dom";
import Router from "./Routers/Router";
import ItemsContextProvider from "./Contexts/ItemsContext";
import ArchitectContextProvider from "./Contexts/ArchitectContext";
import "./styles/styles.scss";

const App = () => (
  <ItemsContextProvider>
    <ArchitectContextProvider>
      <Router />
    </ArchitectContextProvider>
  </ItemsContextProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
