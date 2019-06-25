import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
import Footer from './components/layout/Footer';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// css
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Navbar />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Fragment>
      <Footer />
    </Router>
  </Provider>
);

export default App;
