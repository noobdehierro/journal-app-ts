import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  path,
  component: Component,
  ...rest
}: {
  isAuthenticated: boolean;
  path: string;
  component: () => JSX.Element;
}) => {
  return (
    <Route
      {...rest}
      component={(props: any) => {
        return !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};
// PublicRoute.propTypes = {
//     isAuthenticated:PropTypes.bool.isRequired,
//     component: PropTypes.func.isRequired
// }
