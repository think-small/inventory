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
import RouteWithContext from "./RouteWithContext";
import ArchitectContextProvider from "../Contexts/ArchitectContext";
import WarningsContextProvider from "../Contexts/WarningsContext";
import ItemsContext from "../Contexts/ItemsContext";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <section className="content-container">
          <Switch>
            <RouteWithContext
              exact
              path="/"
              context={WarningsContextProvider}
              component={Dashboard}
            />
            <Route exact path="/ABL/" component={ABL} />
            <RouteWithContext
              exact
              path="/ABL/"
              context={ItemsContext}
              component={ABL}
            />
            <RouteWithContext
              exact
              path="/ABL/:id"
              context={ItemsContext}
              component={ItemDetails}
            />
            <RouteWithContext
              exact
              path="/Architect/"
              context={ArchitectContextProvider}
              component={Architect}
            />
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
