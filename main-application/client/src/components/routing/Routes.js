import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';

import Content from '../content/Content';
import Details from '../details/Details';
import ExploreMore from '../exploreMore/ExploreMore';
import NotFound from '../layout/NotFound';
import Alerts from '../alert/Alerts';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';

const Routes = () => {
  return (
    <Fragment>
      <Alerts />
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
        <Route exact path='/details/:id' component={Details} />
        <Route exact path='/explore' component={ExploreMore} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
