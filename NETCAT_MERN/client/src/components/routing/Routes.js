import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from '../content/Content';
import Details from '../details/Details';
// import Alert from '../layout/Alert';
// import NotFound from '../layout/NotFound';
// import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <Fragment>
      {/* <Alert /> */}
      <Switch>
        <Route
          exact
          path='/'
          render={props => <Content {...props} school='' />}
        />
        <Route
          exact
          path='/viterbi'
          render={props => <Content {...props} school='viterbi' />}
        />
        <Route
          exact
          path='/annenberg'
          render={props => <Content {...props} school='annenberg' />}
        />
        <Route
          exact
          path='/marshall'
          render={props => <Content {...props} school='marshall' />}
        />
        <Route
          exact
          path='/dornsife'
          render={props => <Content {...props} school='dornsife' />}
        />
        <Route exact path='/details/:id' component={Details} />
        <Route
          exact
          path='/not-found'
          component={() => <div>Page not found.</div>}
        />
        <Route
          component={() => (
            <div className='container text-center'>
              <h1>Page not found.</h1>
            </div>
          )}
        />
      </Switch>
    </Fragment>
  );
};

export default Routes;
