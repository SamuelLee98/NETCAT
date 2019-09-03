import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, isAdmin, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuthenticated && !loading) {
        // Not Authenticated
        return <Redirect to='/login' />;
      } else if (isAuthenticated && !isAdmin) {
        // Logged in, but not admin
        return <Redirect to='/dashboard' />;
      } else {
        // Admin
        return <Component {...props} />;
      }
    }}
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
