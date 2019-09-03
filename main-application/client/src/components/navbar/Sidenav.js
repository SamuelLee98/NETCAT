import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const Sidenav = ({
  open,
  toggleSideNav,
  toggleStyle,
  sidenavRef,
  isAuthenticated,
  isAdmin,
  loading,
  history,
  logout
}) => {
  return (
    <div
      id='mySidenav'
      className={`sidenav ${open ? 'open' : 'close'}`}
      ref={sidenavRef}
    >
      <span
        className='closebtn'
        style={{ cursor: 'pointer' }}
        onClick={() => toggleSideNav(false)}
      >
        &times;
      </span>
      <h1 className='sidenav-title'>NETCAT</h1>
      <Link to='/' style={toggleStyle('')} onClick={() => toggleSideNav(false)}>
        HOME
      </Link>
      <Link
        to='/marshall'
        style={toggleStyle('marshall')}
        onClick={() => toggleSideNav(false)}
      >
        MARSHALL
      </Link>
      <Link
        to='/viterbi'
        style={toggleStyle('viterbi')}
        onClick={() => toggleSideNav(false)}
      >
        VITERBI
      </Link>
      <Link
        to='/annenberg'
        style={toggleStyle('annenberg')}
        onClick={() => toggleSideNav(false)}
      >
        ANNENBERG
      </Link>
      <Link
        to='/explore'
        style={toggleStyle('explore')}
        onClick={() => toggleSideNav(false)}
      >
        EXPLORE
      </Link>
      <hr />
      {!loading && isAuthenticated !== null && (
        <Fragment>
          {isAuthenticated ? (
            <Fragment>
              <Link
                to={isAdmin ? '/admin-dashboard' : '/dashboard'}
                style={toggleStyle('dashboard')}
                onClick={() => toggleSideNav(false)}
              >
                DASHBOARD
              </Link>
              <a
                onClick={() => {
                  logout(history);
                  toggleSideNav(false);
                }}
                href='#!'
              >
                <span className='hide-sm'>LOGOUT</span>
              </a>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                to='/register'
                style={toggleStyle('register')}
                onClick={() => toggleSideNav(false)}
              >
                REGISTER
              </Link>
              <Link
                to='/login'
                style={toggleStyle('login')}
                onClick={() => toggleSideNav(false)}
              >
                LOGIN
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

Sidenav.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleSideNav: PropTypes.func.isRequired,
  toggleStyle: PropTypes.func.isRequired,
  sidenavRef: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default Sidenav;
