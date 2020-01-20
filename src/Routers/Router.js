import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import ABL from "../Pages/ABL";
import Architect from "../Pages/Architect";
import Cobas8000 from "../Pages/Cobas8000";
import Cobas8100 from "../Pages/Cobas8100";
import Error404 from "../Pages/404";

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/ABL/" component={ABL} />
        <Route exact path="/Architect/" component={Architect} />
        <Route exact path="/Cobas8000/" component={Cobas8000} />
        <Route exact path="/Cobas8100/" component={Cobas8100} />
        <Route component={Error404} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Router;
