import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { setPage } from '../../actions/event';

// Components
import ProfileDisplay from './ProfileDisplay';
import Spinner from '../layout/Spinner';

// css
import './Dashboard.css';

const Dashboard = ({
  setPage,
  getCurrentProfile,
  deleteAccount,
  profile: { profile, loading },
  auth: { user }
}) => {
  useEffect(() => {
    setPage('dashboard');
    getCurrentProfile();
  }, [setPage, getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='content container'>
      <div className='row'>
        <div className='col-md-1' />
        <div className='col-md-10 my-2'>
          <h1 className='large text-dark'>Dashboard</h1>
          {user && user.avatar && (
            <img className='round-img my-2' src={user.avatar} alt='' />
          )}
          <p className='lead'>
            <i className='fa fa-user' /> Welcome {user && user.username}
          </p>
          {profile !== null ? (
            <Fragment>
              <ProfileDisplay profile={profile} />
              <div className='dash-buttons my-2'>
                <Link to='/edit-profile' className='btn btn-light'>
                  <i className='fa fa-user-circle' /> Edit Profile
                </Link>
                <a className='btn btn-danger' onClick={() => deleteAccount()}>
                  <i className='fa fa-user-minus' /> Delete My Account
                </a>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>
          )}
        </div>
        <div className='col-md-1' />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, setPage, deleteAccount }
)(Dashboard);
