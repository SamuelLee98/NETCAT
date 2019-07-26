import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
import Footer from './components/layout/Footer';
<<<<<<< HEAD
=======
import ShareModal from './components/layout/ShareModal';
import Alert from './components/layout/Alert';
>>>>>>> f77a29417e1100df103e7382a6b40698f5f06dcf

// Redux
import { Provider } from 'react-redux';
import store from './store';
import ShareModal from './components/layout/ShareModal';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// css
import './App.css';

<<<<<<< HEAD
// Check if localStorage contains token from previous session
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Navbar />
        <Switch>
          <Route component={Routes} />
        </Switch>
        <ShareModal />
        <Footer />
      </Router>
    </Provider>
  );
};
=======
const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Navbar />
      <Alert />
      <Switch>
        <Route component={Routes} />
      </Switch>
      <ShareModal />
      <Footer />
    </Router>
  </Provider>
);
>>>>>>> f77a29417e1100df103e7382a6b40698f5f06dcf

export default App;
