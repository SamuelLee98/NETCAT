import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import {
  getCurrentProfile,
  clearProfile,
  deleteAccount
} from '../../actions/profile';
import { getCatalogueEvents, clearCatalogue } from '../../actions/catalogue';
import { setPage } from '../../actions/event';

// Components
import ProfileDisplay from './ProfileDisplay';
import Catalogue from './Catalogue';
import Spinner from '../layout/Spinner';
import ServerError from '../layout/ServerError';

// Spinner svg
import spinner from '../layout/spinner.svg';

// css
import './Dashboard.css';

const eventsPerPage = 5;

// Loader for inifiniteScroll
const Loader = (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    key={0}
  >
    <img
      src={spinner}
      style={{ height: '50px', width: '50px' }}
      alt='Loading'
    />
  </div>
);

const Dashboard = ({
  setPage,
  getCurrentProfile,
  getCatalogueEvents,
  clearCatalogue,
  clearProfile,
  deleteAccount,
  auth: { user },
  profile,
  catalogue
}) => {
  const [currOffset, setCurrOffset] = useState(eventsPerPage);
  // Only update events when exploreEvents change
  const events = useCallback(catalogue.events, [catalogue.events]);
  const hasMore = useCallback(catalogue.hasMore, [catalogue.hasMore]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('dashboard');
    getCurrentProfile();
    getCatalogueEvents(0, eventsPerPage, true);

    return () => {
      clearCatalogue();
      clearProfile();
    };
  }, [
    setPage,
    getCurrentProfile,
    getCatalogueEvents,
    clearCatalogue,
    clearProfile
  ]);

  // On add/remove from catalogue click
  const onDeleteClick = useCallback(() => {
    setCurrOffset(currOffset - 1);
  }, [currOffset]);

  const loadEvents = async () => {
    await getCatalogueEvents(currOffset, eventsPerPage);
    setCurrOffset(currOffset + eventsPerPage);
  };

  if (profile.error && profile.error.status === 500) {
    return <ServerError />;
  }

  if (catalogue.error && catalogue.error.status === 500) {
    return <ServerError />;
  }

  if (profile.loading || catalogue.eventsLoading || events === null) {
    return <Spinner />;
  }

  return (
    <div className='content container'>
      <h1 className='large text-dark mb-2'>
        {user && `${user.username}'s`} Catalogue
      </h1>
      <div className='row'>
        <div className='col-md-3 mb-2'>
          {user && user.avatar && (
            <img
              className='round-img my-2'
              src={user.avatar}
              alt=''
              style={{ width: '100%', border: '2px solid black' }}
            />
          )}
          <p>
            <i className='fas fa-user' /> Welcome {user && user.username}
          </p>
          {profile.profile !== null ? (
            <Fragment>
              <ProfileDisplay profile={profile.profile} />
              <div className='my-2'>
                <Link to='/edit-profile' className='btn btn-info btn-block m-1'>
                  <i className='fas fa-user-edit' /> Edit Profile
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link
                to='/create-profile'
                className='btn btn-primary btn-block m-1'
              >
                <i className='fas fa-user-plus' /> Create Profile
              </Link>
            </Fragment>
          )}
          <button
            className='btn btn-danger btn-block m-1'
            onClick={() => deleteAccount()}
          >
            <i className='fas fa-user-minus' /> Delete Account
          </button>
          <hr className='d-block d-md-none' />
        </div>
        <div className='col-md-9'>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => loadEvents()}
            hasMore={hasMore}
            loader={Loader}
          >
            {events.map(event => (
              <Catalogue
                key={event._id}
                event={event}
                onDeleteClick={onDeleteClick}
              />
            ))}
            {!hasMore &&
              (events.length === 0 ? (
                <p>You do not have any events in your catalogue.</p>
              ) : (
                <Fragment>
                  <div className='d-flex justify-content-center'>
                    <h5>No more events left...</h5>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button
                      className='btn btn-link text-danger'
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Scroll To Top
                    </button>
                  </div>
                </Fragment>
              ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setPage: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getCatalogueEvents: PropTypes.func.isRequired,
  clearCatalogue: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
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
  {
    getCurrentProfile,
    getCatalogueEvents,
    clearCatalogue,
    clearProfile,
    setPage,
    deleteAccount
  }
)(Dashboard);
