import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ page, auth: { isAuthenticated, loading }, logout }) => {
  const [open, toggleSideNav] = useState(false);

  const toggleStyle = link => (link === page ? { color: '#ac101b' } : {});

  return (
    <Fragment>
      <div id='mySidenav' className={`sidenav ${open ? 'open' : 'close'}`}>
        <span
          className='closebtn'
          style={{ cursor: 'pointer' }}
          onClick={() => toggleSideNav(false)}
        >
          &times;
        </span>
        <h1 className='sidenav-title'>NETCAT</h1>
        <Link to='/' style={toggleStyle('')}>
          HOME
        </Link>
        <Link to='/marshall' style={toggleStyle('marshall')}>
          MARSHALL
        </Link>
        <Link to='/viterbi' style={toggleStyle('viterbi')}>
          VITERBI
        </Link>
        <Link to='/annenberg' style={toggleStyle('annenberg')}>
          ANNENBERG
        </Link>
        <Link to='/dornsife' style={toggleStyle('dornsife')}>
          DORNSIFE
        </Link>
        <Link to='/' style={toggleStyle('contact')}>
          CONTACT US
        </Link>
        <hr />
        {!loading && (
          <Fragment>
            {isAuthenticated ? (
              <Fragment>
                <Link to='/dashboard' style={toggleStyle('dashboard')}>
                  DASHBOARD
                </Link>
                <a onClick={logout} href='#!'>
                  <span className='hide-sm'>LOGOUT</span>
                </a>
              </Fragment>
            ) : (
              <Fragment>
                <Link to='/register' style={toggleStyle('register')}>
                  REGISTER
                </Link>
                <Link to='/login' style={toggleStyle('login')}>
                  LOGIN
                </Link>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      <div className='header sticky' id='myHeader'>
        <div className='container d-none d-md-block'>
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
            <div className='col'>
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
                        onClick={logout}
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
)(Navbar);
