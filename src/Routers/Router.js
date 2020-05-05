import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashboardComponent from "../pages_/dashboard/dashboard.component";
import AblComponent from "../pages_/abl/abl.component";
import ArchitectComponent from "../pages_/architect/architect.component";
import Cobas8000Component from "../pages_/cobas8000/cobas8000.component";
import Cobas8100Component from "../pages_/cobas8100/cobas8100.component";
import ManualUsedTransaction from "../pages_/ManualUsedTransaction";
import Error404 from "../pages_/404";
import ItemDetails from "../pages_/ItemDetails";
import SidebarComponent from "../components_/sidebar/sidebar.component";
import { ArchitectContext } from "../Contexts/ArchitectContext";
import { ABLContext } from "../Contexts/ABLContext";
import Login from "../components_/login/login.component";
import SignUp from "../components_/signup/signup.component";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const Router = () => {
  const { architectItems } = useContext(ArchitectContext);
  const { ablItems } = useContext(ABLContext);
  return (
    <BrowserRouter>
      <div className="app-container">
        <SidebarComponent />
        <section className="content-container">
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={DashboardComponent} />
            <Route exact path="/AblComponent/" component={AblComponent} />
            <Route exact path="/AblComponent/:id" component={ItemDetails} />
            <Route exact path="/ArchitectComponent/" component={ArchitectComponent} />
            <Route exact path="/ArchitectComponent/:id" component={ItemDetails} />
            <Route exact path="/Cobas8000Component/" component={Cobas8000Component} />
            <Route exact path="/Cobas8100Component/" component={Cobas8100Component} />
            <Route
              exact
              path="/ManualUsedTransaction"
              component={ManualUsedTransaction}
            />
            <PrivateRoute path="/Cobas8100Component">
              <Cobas8100Component />
            </PrivateRoute>
            <Route exact path="/Cobas8000Component/" component={Cobas8000Component} />
            <Route component={Error404} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default Router;
