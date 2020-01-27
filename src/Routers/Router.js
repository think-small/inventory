import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import ABL from "../Pages/ABL";
import Architect from "../Pages/Architect";
import Cobas8000 from "../Pages/Cobas8000";
import Cobas8100 from "../Pages/Cobas8100";
import Error404 from "../Pages/404";
import ItemDetails from "../Pages/ItemDetails";
import Sidebar from "../Components/Sidebar";
import WarningsContextProvider from "../Contexts/WarningsContext";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <section className="content-container">
          <Switch>
            <WarningsContextProvider>
              <Route exact path="/" component={Dashboard} />
            </WarningsContextProvider>
            <Route exact path="/ABL/" component={ABL} />
            <Route exact path="/ABL/:id" component={ItemDetails} />
            <Route exact path="/Architect/" component={Architect} />
            <Route exact path="/Architect/:id" component={ItemDetails} />
            <Route exact path="/Cobas8000/" component={Cobas8000} />
            <Route exact path="/Cobas8100/" component={Cobas8100} />
            <Route component={Error404} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default Router;
