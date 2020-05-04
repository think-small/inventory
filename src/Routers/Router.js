import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ABL from "../Pages/ABL";
import Architect from "../Pages/Architect";
import Cobas8000 from "../Pages/Cobas8000";
import Cobas8100 from "../Pages/Cobas8100";
import ManualUsedTransaction from "../Pages/ManualUsedTransaction";
import Error404 from "../Pages/404";
import ItemDetails from "../Pages/ItemDetails";
import SidebarComponent from "../components/sidebar/sidebar.component";
import { ArchitectContext } from "../Contexts/ArchitectContext";
import { ABLContext } from "../Contexts/ABLContext";
import Login from "../Login";
import SignUp from "../SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/ABL/" component={ABL} />
            <Route exact path="/ABL/:id" component={ItemDetails} />
            <Route exact path="/Architect/" component={Architect} />
            <Route exact path="/Architect/:id" component={ItemDetails} />
            <Route exact path="/Cobas8000/" component={Cobas8000} />
            <Route exact path="/Cobas8100/" component={Cobas8100} />
            <Route
              exact
              path="/ManualUsedTransaction"
              component={ManualUsedTransaction}
            />
            <PrivateRoute path="/Cobas8100">
              <Cobas8100 />
            </PrivateRoute>
            <Route exact path="/Cobas8000/" component={Cobas8000} />
            <Route component={Error404} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default Router;
