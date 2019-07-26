import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';

import Content from '../content/Content';
import Details from '../details/Details';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route
          exact
          path='/'
          render={props => <Content {...props} page='' />}
        />
        <Route
          exact
          path='/viterbi'
          render={props => <Content {...props} page='viterbi' />}
        />
        <Route
          exact
          path='/annenberg'
          render={props => <Content {...props} page='annenberg' />}
        />
        <Route
          exact
          path='/marshall'
          render={props => <Content {...props} page='marshall' />}
        />
        <Route
          exact
          path='/dornsife'
          render={props => <Content {...props} page='dornsife' />}
        />
        <Route exact path='/details/:id' component={Details} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
