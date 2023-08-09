import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  if (isAuthenticated) {
    return <Route element={element} {...rest} />;
  } else {
