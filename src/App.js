import React from "react";
import ReactDOM from "react-dom";
import Router from "./Routers/Router";
import ItemsContextProvider from "./Contexts/ItemsContext";
import ArchitectItemsContextProvider from "./Contexts/ArchitectContext";
import ABLContextProvider from "./Contexts/ABLContext";
import WarningsContextProvider from "./Contexts/WarningsContext";
import "./styles/styles.scss";

const App = () => (
  <ItemsContextProvider>
    <ArchitectItemsContextProvider>
      <ABLContextProvider>
        <WarningsContextProvider>
          <Router />
        </WarningsContextProvider>
      </ABLContextProvider>
    </ArchitectItemsContextProvider>
  </ItemsContextProvider>



  
);
if (module.hot) {
  module.hot.accept();
  }

ReactDOM.render(<App />, document.getElementById("root"));
