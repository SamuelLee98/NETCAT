import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getCatalogueEvents } from '../../actions/catalogue';
import { setPage } from '../../actions/event';

// Components
import ProfileDisplay from './ProfileDisplay';
import Catalogue from './Catalogue';
import Spinner from '../layout/Spinner';
import ServerError from '../layout/ServerError';

// css
import './Dashboard.css';

const Dashboard = ({
  setPage,
  getCurrentProfile,
  getCatalogueEvents,
  deleteAccount,
  auth: { user },
  profile,
  catalogue
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('dashboard');
    getCurrentProfile();
    getCatalogueEvents();
  }, [setPage, getCurrentProfile, getCatalogueEvents]);

  if (profile.error && profile.error.status === 500) {
    return <ServerError />;
  }

  if (catalogue.error && catalogue.error.status === 500) {
    return <ServerError />;
  }

  return profile.loading || catalogue.loading ? (
    <Spinner />
  ) : (
    <div className='content container'>
      <h1 className='large text-dark mb-2'>
        {user && `${user.username}'s`} Catalogue
      </h1>
      <div className='row'>
        <div className='col-md-3'>
          {user && user.avatar && (
            <img
              className='round-img my-2'
              src={user.avatar}
              alt=''
              style={{ width: '100%', border: '2px solid black' }}
            />
          )}
          <p className='lead'>
            <i className='fa fa-user' /> Welcome {user && user.username}
          </p>
          {profile.profile !== null ? (
            <Fragment>
              <ProfileDisplay profile={profile.profile} />
              <div className='my-2'>
                <Link
                  to='/edit-profile'
                  className='btn btn-light btn-block m-1'
                >
                  <i className='fa fa-user-circle' /> Edit Profile
                </Link>
                <button
                  className='btn btn-danger btn-block m-1'
                  onClick={() => deleteAccount()}
                >
                  <i className='fa fa-user-minus' /> Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link
                to='/create-profile'
                className='btn btn-primary btn-block m-1'
              >
                Create Profile
              </Link>
            </Fragment>
          )}
        </div>
        <div className='col-md-9'>
          {catalogue.events === null || catalogue.events.length === 0 ? (
            <p>You do not have any events in your catalogue yet.</p>
          ) : (
            <div className='posts'>
              {catalogue.events.map(event => (
                <Catalogue key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setPage: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getCatalogueEvents: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  catalogue: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  catalogue: state.catalogue,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getCatalogueEvents, setPage, deleteAccount }
)(Dashboard);
