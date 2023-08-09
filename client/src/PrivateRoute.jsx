import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  if (isAuthenticated) {
    return <Route element={element} {...rest} />;
  } else {
    // Redirect to the login screen if not authenticated
    return <Navigate to="/login" />;
  }
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
