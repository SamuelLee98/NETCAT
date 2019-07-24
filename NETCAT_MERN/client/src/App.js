import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
import Footer from './components/layout/Footer';
import ShareModal from './components/layout/ShareModal';
import Alert from './components/layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// css
import './App.css';

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

export default App;
