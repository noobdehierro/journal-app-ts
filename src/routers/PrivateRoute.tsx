import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({
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
      exact
      component={(props: any) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="auth/login" />
        )
      }
    />
  );
};
