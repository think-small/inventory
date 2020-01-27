import React from "react";
import { Route } from "react-router-dom";

const RouteWithContext = ({ context, component, ...rest }) => {
  const Component = component;
  const Context = context;
  return (
    <Route {...rest}>
      <Context>
        <Component />
      </Context>
    </Route>
  );
};

export default RouteWithContext;
