import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

// Navbar icon images
import viterbi from './images/viterbi.png';
import marshall from './images/marshall.jpg';
import annenberg from './images/annenberg.jpg';
import dornsife from './images/dornsife.png';

const Navbar = ({
  page,
  auth: { isAuthenticated, loading },
  logout,
  history
}) => {
  const [open, toggleSideNav] = useState(false);
  const toggleStyle = link => (link === page ? { color: '#ac101b' } : {});
  const sidenavRef = useRef(null);

  // Close sidediv if clicked outside
  const handleClickOutside = event => {
    if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
      if (open) toggleSideNav(!open);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <Fragment>
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
        <Link
          to='/'
          style={toggleStyle('')}
          onClick={() => toggleSideNav(false)}
        >
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
          to='/dornsife'
          style={toggleStyle('dornsife')}
          onClick={() => toggleSideNav(false)}
        >
          DORNSIFE
        </Link>
        <Link
          to='/explore'
          style={toggleStyle('explore')}
          onClick={() => toggleSideNav(false)}
        >
          EXPLORE
        </Link>
        <hr />
        {!loading && (
          <Fragment>
            {isAuthenticated ? (
              <Fragment>
                <Link
                  to='/dashboard'
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
      <div className='header sticky' id='myHeader'>
        <div className='container d-none d-lg-block'>
          <nav className='navbar navbar-expand-lg'>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item my-auto'>
                  <svg
                    className='side-menu'
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleSideNav(true)}
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
                  </svg>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('')}
                  >
                    <i className='fas fa-home fa-sm' /> HOME
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/marshall'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('marshall')}
                  >
                    <i className='fas fa-briefcase fa-sm' /> MARSHALL
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/viterbi'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('viterbi')}
                  >
                    <i className='fas fa-robot fa-sm' /> VITERBI
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/annenberg'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('annenberg')}
                  >
                    <i className='fas fa-comments fa-sm' /> ANNENBERG
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/dornsife'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('dornsife')}
                  >
                    <i className='fas fa-book fa-sm' /> DORNSIFE
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/explore'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('explore')}
                  >
                    <i className='fas fa-search-location fa-sm' /> EXPLORE
                  </Link>
                </li>
              </ul>
              {!loading && isAuthenticated ? (
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link
                      to='/dashboard'
                      className='btn btn-header btn-outline-danger'
                      style={toggleStyle('dashboard')}
                    >
                      <i className='fas fa-user fa-sm' /> DASHBOARD
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <button
                      onClick={() => logout(history)}
                      href='#!'
                      className='btn btn-header btn-outline-danger'
                    >
                      <i className='fas fa-sign-out-alt fa-sm' /> LOGOUT
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className='navbar-nav'>
                  <li className='nav-item'>
                    <Link
                      to='/register'
                      className='btn btn-header btn-outline-danger'
                      style={toggleStyle('register')}
                    >
                      <i className='fas fa-user-plus fa-sm' /> REGISTER
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/login'
                      className='btn btn-header btn-outline-danger'
                      style={toggleStyle('login')}
                    >
                      <i className='fas fa-sign-in-alt fa-sm' /> LOGIN
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
        <div className='container d-none d-md-block d-lg-none'>
          <nav className='navbar navbar-expand-md'>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item my-auto'>
                  <svg
                    className='side-menu'
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleSideNav(true)}
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
                  </svg>
                </li>
                <li className='nav-item my-auto'>
                  <Link
                    to='/'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('')}
                  >
                    <i className='fas fa-home fa-4x' />
                  </Link>
                </li>
                <li className='nav-item my-auto'>
                  <Link
                    to='/marshall'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('marshall')}
                  >
                    <img
                      src={marshall}
                      className='rounded navbar-md-img'
                      alt='Marshall'
                    />
                  </Link>
                </li>
                <li className='nav-item my-auto'>
                  <Link
                    to='/viterbi'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('viterbi')}
                  >
                    <img
                      src={viterbi}
                      className='rounded navbar-md-img'
                      alt='Viterbi'
                    />
                  </Link>
                </li>
                <li className='nav-item my-auto'>
                  <Link
                    to='/annenberg'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('annenberg')}
                  >
                    <img
                      src={annenberg}
                      className='rounded navbar-md-img'
                      alt='Annenberg'
                    />
                  </Link>
                </li>
                <li className='nav-item my-auto'>
                  <Link
                    to='/marshall'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('dornsife')}
                  >
                    <img
                      src={dornsife}
                      className='rounded navbar-md-img'
                      alt='Dornsife'
                    />
                  </Link>
                </li>
                <li className='nav-item my-auto'>
                  <Link
                    to='/explore'
                    className='btn btn-header btn-outline-danger'
                    style={toggleStyle('explore')}
                  >
                    <i className='fas fa-search-location fa-4x' />
                  </Link>
                </li>
              </ul>
              {!loading && isAuthenticated ? (
                <ul className='navbar-nav'>
                  <li className='nav-item my-auto'>
                    <Link
                      to='/dashboard'
                      className='btn btn-header btn-outline-danger'
                      style={toggleStyle('dashboard')}
                    >
                      <i className='fas fa-user fa-2x' />
                    </Link>
                  </li>
                  <li className='nav-item my-auto'>
                    <button
                      onClick={() => logout(history)}
                      href='#!'
                      className='btn btn-header btn-outline-danger'
                    >
                      <i className='fas fa-sign-out-alt fa-2x' />
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className='navbar-nav'>
                  <li className='nav-item my-auto'>
                    <Link
                      to='/register'
                      className='btn btn-header btn-outline-danger'
                      style={toggleStyle('register')}
                    >
                      <i className='fas fa-user-plus fa-2x' />
                    </Link>
                  </li>
                  <li className='nav-item my-auto'>
                    <Link
                      to='/login'
                      className='btn btn-header btn-outline-danger'
                      style={toggleStyle('login')}
                    >
                      <i className='fas fa-sign-in-alt fa-2x' />
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
        <div className='container d-none'>
          <div className='row'>
            <div className='col'>
              <svg
                className='side-menu'
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSideNav(true)}
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            </div>
            <div className='col'>
              <Link
                to='/'
                className='btn btn-header btn-outline-danger'
                style={toggleStyle('')}
              >
                HOME
              </Link>
            </div>
            <div className='col'>
              <Link
                to='/marshall'
                className='btn btn-header btn-outline-danger'
                style={toggleStyle('marshall')}
              >
                MARSHALL
              </Link>
            </div>
            <div className='col'>
              <Link
                to='/viterbi'
                className='btn btn-header btn-outline-danger'
                style={toggleStyle('viterbi')}
              >
                VITERBI
              </Link>
            </div>
            <div className='col'>
              <Link
                to='/annenberg'
                className='btn btn-header btn-outline-danger'
                style={toggleStyle('annenberg')}
              >
                ANNENBERG
              </Link>
            </div>
            <div className='col'>
              <Link
                to='/dornsife'
                className='btn btn-header btn-outline-danger'
                style={toggleStyle('dornsife')}
              >
                DORNSIFE
              </Link>
            </div>
            {/* <div className='col'>
              <svg
                className='search-icon'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                <path d='M0 0h24v24H0z' fill='none' />
              </svg>
            </div> */}
            {!loading && (
              <Fragment>
                {isAuthenticated ? (
                  <Fragment>
                    <div className='col'>
                      <Link
                        to='/dashboard'
                        className='btn btn-header btn-outline-danger'
                        style={toggleStyle('dashboard')}
                      >
                        <i className='fa fa-user' /> DASHBOARD
                      </Link>
                    </div>
                    <div className='col'>
                      <button
                        onClick={() => logout(history)}
                        href='#!'
                        className='btn btn-header btn-outline-danger'
                      >
                        <i className='fa fa-sign-out' /> LOGOUT
                      </button>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className='col'>
                      <Link
                        to='/register'
                        className='btn btn-header btn-outline-danger'
                        style={toggleStyle('register')}
                      >
                        REGISTER
                      </Link>
                    </div>
                    <div className='col'>
                      <Link
                        to='/login'
                        className='btn btn-header btn-outline-danger'
                        style={toggleStyle('login')}
                      >
                        LOGIN
                      </Link>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div className='container d-none d-sm-block d-md-none'>
          <div className='row'>
            <div className='col-sm-2' style={{ marginTop: '20px' }}>
              <svg
                className='side-menu'
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSideNav(true)}
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            </div>
            <div className='col-sm-8 '>
              <h1 className='sidenav-title'>NETCAT</h1>
            </div>
            <div className='col-sm-2 ' style={{ marginTop: '20px' }}>
              <svg
                className='search-icon'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                <path d='M0 0h24v24H0z' fill='none' />
              </svg>
            </div>
          </div>
        </div>
        <div className='container d-block d-sm-none'>
          <div className='row'>
            <div className='col-xs-6' style={{ marginTop: '20px' }}>
              <svg
                className='side-menu'
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSideNav(true)}
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            </div>
            <div className='col-xs-12' style={{ marginLeft: '20px' }}>
              <h1 className='sidenav-title'>NETCAT</h1>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  page: state.event.page,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Navbar));
