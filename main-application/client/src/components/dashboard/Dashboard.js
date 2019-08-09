import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import {
  getCatalogueEvents,
  getCatalogueEventIds,
  pushToCatalogue
} from '../../actions/catalogue';
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
  getCatalogueEventIds,
  pushToCatalogue,
  deleteAccount,
  auth: { user },
  profile,
  catalogue
}) => {
  const eventsPerPage = 10;
  const [pageCount, setPageCount] = useState(null);
  const [currPageNo, setCurrPageNo] = useState(0);
  const [initialLoad, toggleInitialLoad] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('dashboard');
    getCurrentProfile();
    getCatalogueEventIds();
    getCatalogueEvents(0, eventsPerPage);
  }, [setPage, getCurrentProfile, getCatalogueEventIds, getCatalogueEvents]);

  useEffect(() => {
    if (
      !catalogue.eventsLoading &&
      !catalogue.idsLoading &&
      catalogue.ids !== null &&
      catalogue.events !== null
    ) {
      if (initialLoad) {
        toggleInitialLoad(false);
        setPageCount(Math.ceil(catalogue.ids.length / eventsPerPage));
      }
    }
  }, [catalogue, initialLoad]);

  // Run this useEffect when user clicks on add/remove button
  const handleDeleteEvent = () => {
    // Recalculate page count
    setPageCount(Math.ceil((catalogue.ids.length - 1) / eventsPerPage));

    // If deleting last event from a certain page
    if (catalogue.events.length === 1) {
      // If no more events left
      if (catalogue.ids.length === 1) return;

      // Go to the previous page
      setCurrPageNo(currPageNo - 1);

      // Get previous 10 events
      let offset = Math.ceil((currPageNo - 1) * eventsPerPage);
      getCatalogueEvents(offset, offset + eventsPerPage);

      return;
    }

    // Get index of event to add to events array
    const indexToAdd = (currPageNo + 1) * eventsPerPage;

    // If event deleted is from last page of catalogue
    if (indexToAdd >= catalogue.ids.length) return;

    const eventIdToAdd = catalogue.ids[indexToAdd];

    // Push first event of next page to events array
    pushToCatalogue(eventIdToAdd);
  };

  const handlePageClick = data => {
    window.scrollTo(0, 0);
    let currPageNo = data.selected;
    setCurrPageNo(currPageNo);
    let offset = Math.ceil(currPageNo * eventsPerPage);
    getCatalogueEvents(offset, offset + eventsPerPage);
  };

  if (profile.error && profile.error.status === 500) {
    return <ServerError />;
  }

  if (catalogue.error && catalogue.error.status === 500) {
    return <ServerError />;
  }

  if (
    profile.loading ||
    profile.profile === null ||
    initialLoad ||
    pageCount === null
  ) {
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
          {catalogue.eventsLoading ? (
            <Spinner />
          ) : catalogue.events === null || catalogue.events.length === 0 ? (
            <p>You do not have any events in your catalogue.</p>
          ) : (
            <Fragment>
              {catalogue.events.map(event => (
                <Catalogue
                  key={event._id}
                  event={event}
                  handleDeleteEvent={handleDeleteEvent}
                />
              ))}
              <nav aria-label='more-events nav'>
                <ReactPaginate
                  previousLabel={'previous'}
                  nextLabel={'next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  pageClassName={'page-item'}
                  previousClassName={'page-item'}
                  nextClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousLinkClassName={'page-link'}
                  nextLinkClassName={'page-link'}
                  activeClassName={'active'}
                  forcePage={currPageNo}
                />
              </nav>
            </Fragment>
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
  getCatalogueEventIds: PropTypes.func.isRequired,
  pushToCatalogue: PropTypes.func.isRequired,
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
    getCatalogueEventIds,
    pushToCatalogue,
    setPage,
    deleteAccount
  }
)(Dashboard);
