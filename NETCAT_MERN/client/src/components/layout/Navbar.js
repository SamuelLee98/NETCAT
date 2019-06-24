import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, toggleSideNav] = useState(false);

  return (
    <Fragment>
      <div id='mySidenav' className={`sidenav ${open ? 'open' : 'close'}`}>
        <span
          className='closebtn'
          style={{ cursor: 'pointer' }}
          onClick={() => toggleSideNav(!open)}
        >
          &times;
        </span>
        <h1 className='sidenav-title'>NETCAT</h1>
        <Link to='/' style={{ color: '#ac101b' }}>
          HOME
        </Link>
        <Link to='/'>MARSHALL</Link>
        <Link to='/'>VITERBI</Link>
        <Link to='/'>ANNENBERG</Link>
        <Link to='/'>DORNSIFE</Link>
        <Link to='/'>CONTACT US</Link>
        <Link to='/'>LOGIN/REGISTER</Link>
      </div>
      <div className='header sticky' id='myHeader'>
        <div className='container d-none d-md-block'>
          <div className='row'>
            <div className='col-lg-2 col-md-2'>
              <svg
                className='side-menu'
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSideNav(!open)}
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            </div>
            <div className='col-lg-2 col-md-2'>
              <Link to='/' className='btn btn-header btn-outline-danger'>
                MARSHALL
              </Link>
            </div>
            <div className='col-lg-2 col-md-2'>
              <Link to='/' className='btn btn-header btn-outline-danger'>
                VITERBI
              </Link>
            </div>
            <div className='col-lg-2 col-md-2'>
              <Link to='/' className='btn btn-header btn-outline-danger'>
                ANNENBERG
              </Link>
            </div>
            <div className='col-lg-2 col-md-2'>
              <Link to='/' className='btn btn-header btn-outline-danger'>
                DORNSIFE
              </Link>
            </div>
            <div className='col-lg-2 col-md-2'>
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
        <div className='container d-none d-sm-block d-md-none'>
          <div className='row'>
            <div className='col-sm-2' style={{ marginTop: '20px' }}>
              <svg
                className='side-menu'
                style={{ cursor: 'pointer' }}
                onClick={() => toggleSideNav(!open)}
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
                onClick={() => toggleSideNav(!open)}
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

export default Navbar;
