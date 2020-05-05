import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashboardComponent from "../pages/dashboard/dashboard.component";
import AblComponent from "../pages/abl/abl.component";
import ArchitectComponent from "../pages/architect/architect.component";
import Cobas8000Component from "../pages/cobas8000/cobas8000.component";
import Cobas8100Component from "../pages/cobas8100/cobas8100.component";
import ManualUsedTransaction from "../pages/ManualUsedTransaction";
import Error404 from "../pages/404";
import ItemDetails from "../pages/ItemDetails";
import SidebarComponent from "../components/sidebar/sidebar.component";
import { ArchitectContext } from "../Contexts/ArchitectContext";
import { ABLContext } from "../Contexts/ABLContext";
import Login from "../components/login/login.component";
import SignUp from "../components/signup/signup.component";
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
            <Route exact path="/ABL/" component={AblComponent} />
            <Route exact path="/ABL/:id" component={ItemDetails} />
            <Route exact path="/Architect/" component={ArchitectComponent} />
            <Route exact path="/Architect/:id" component={ItemDetails} />
            <Route exact path="/Cobas8000/" component={Cobas8000Component} />
            <Route exact path="/Cobas8100/" component={Cobas8100Component} />
            <Route
              exact
              path="/ManualUsedTransaction"
              component={ManualUsedTransaction}
            />
            <PrivateRoute path="/Cobas8100">
              <Cobas8100Component />
            </PrivateRoute>
            <Route exact path="/Cobas8000/" component={Cobas8000Component} />
            <Route component={Error404} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default Router;
