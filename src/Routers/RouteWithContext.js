import React from "react";
import { Route } from "react-router-dom";

const RouteWithContext = ({ contextProvider, component, context, ...rest }) => {
  const Component = component;
  const ContextProvider = contextProvider;
  return (
    <Route {...rest}>
      <ContextProvider>
        <Component context={context} />
      </ContextProvider>
    </Route>
  );
};

export default RouteWithContext;
