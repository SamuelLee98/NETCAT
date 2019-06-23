import React, { Fragment } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Content from './components/content/Content';

import './App.css';

const App = () => (
  <Fragment>
    <Header />
    <Navbar />
    <Content />
  </Fragment>
);

export default App;
