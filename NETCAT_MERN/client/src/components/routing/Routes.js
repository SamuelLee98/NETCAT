import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from '../content/Content';
// import Alert from '../layout/Alert';
// import NotFound from '../layout/NotFound';
// import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <Fragment>
      {/* <Alert /> */}
      <Switch>
        <Route exact path='/' component={Content} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
