import React from "react";
import { Route, Redirect } from "react-router-dom";


export default function ProtectedRoute({
  component: Component,
  signed,
  ...rest
})  {
 
 
  return (
    <Route
      {...rest}
      render={props => {
        if (signed) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
