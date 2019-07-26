import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { setPage } from '../../actions/event';

const Dashboard = ({
  setPage,
  getCurrentProfile,
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
          <p className='lead'>
            <i className='fa fa-user' /> Welcome {user && user.username}
          </p>
          {profile !== null ? (
            <Fragment>
              <div className='my-2'>
                <button
                  className='btn btn-danger'
                  // onClick={() => deleteAccount()}
                >
                  <i className='fa fa-user-minus' /> Delete My Account
                </button>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, setPage }
)(Dashboard);
