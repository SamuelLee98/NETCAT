import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import AdminRoute from '../routing/AdminRoute';

import Feature from '../feature/Feature';
import Details from '../details/Details';
import ExploreMore from '../explore-more/ExploreMore';
import NotFound from '../layout/NotFound';
import Alerts from '../alert/Alerts';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Catalogue from '../catalogue/Catalogue';
import AdminCatalogue from '../admin-catalogue/AdminCatalogue.js';

const Routes = () => {
  return (
    <Fragment>
      <Alerts />
      <Switch>
        <Route
          exact
          path='/'
          render={props => <Feature {...props} page='' />}
        />
        <Route
          exact
          path='/viterbi'
          render={props => <Feature {...props} page='viterbi' />}
        />
        <Route
          exact
          path='/annenberg'
          render={props => <Feature {...props} page='annenberg' />}
        />
        <Route
          exact
          path='/marshall'
          render={props => <Feature {...props} page='marshall' />}
        />
        <Route exact path='/details/:id' component={Details} />
        <Route exact path='/explore' component={ExploreMore} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/catalogue' component={Catalogue} />
        <AdminRoute exact path='/admin-catalogue' component={AdminCatalogue} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
