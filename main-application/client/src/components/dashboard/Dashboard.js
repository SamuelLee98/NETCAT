import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import { getCatalogueEvents, clearCatalogue } from '../../actions/catalogue';
import { setPage } from '../../actions/event';

// Components
import Catalogue from './Catalogue';
import Spinner from '../layout/Spinner';
import ServerError from '../layout/ServerError';
import MapWrapper from '../map/MapWrapper';

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
  getCatalogueEvents,
  clearCatalogue,
  auth: { user, isAdmin },
  catalogue
}) => {
  const [currOffset, setCurrOffset] = useState(eventsPerPage);
  // Only update events when exploreEvents change
  const events = useCallback(catalogue.events, [catalogue.events]);
  const hasMore = useCallback(catalogue.hasMore, [catalogue.hasMore]);

  // On event card click, rezoom map and show info box
  const [clickedEventId, setClickedEventId] = useState(null);
  const onEventCardClick = useCallback(
    (e, id) => {
      // If card buttons clicked, do nothing
      if (e.target.id === 'card-button-icon') return;
      // Set id back to null if clicked again
      setClickedEventId(
        clickedEventId === null || id !== clickedEventId ? id : null
      );
    },
    [clickedEventId]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('dashboard');
    getCatalogueEvents(0, eventsPerPage, true);
    return () => {
      clearCatalogue();
    };
  }, [setPage, getCatalogueEvents, clearCatalogue]);

  // On add/remove from catalogue click
  const onDeleteClick = useCallback(() => {
    setCurrOffset(currOffset - 1);
  }, [currOffset]);

  console.log(events);

  const loadEvents = () => {
    getCatalogueEvents(currOffset, eventsPerPage);
    setCurrOffset(currOffset + eventsPerPage);
  };

  if (isAdmin) {
    return <Redirect to='/admin-dashboard' />;
  }

  if (catalogue.error && catalogue.error.status === 500) {
    return <ServerError />;
  }

  if (catalogue.eventsLoading || events === null) {
    return <Spinner />;
  }

  return (
    <div className='content'>
      <div className='container'>
        <h1
          className='large text-dark mb-4'
          style={{ fontFamily: 'helvetica-bold' }}
        >
          <span className='text-capitalize'>
            {user && `${user.username}'s`} Catalogue
          </span>
        </h1>
        <hr />
        <div className='row'>
          <div className='col-12 col-lg-8'>
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
                  onEventCardClick={onEventCardClick}
                />
              ))}
              {!hasMore &&
                (events.length === 0 ? (
                  <h5 id='no-content'>
                    You do not have any events in your catalogue.
                  </h5>
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
          <div className='d-none d-lg-block col-lg-4'>
            <div
              className='sticky-container'
              style={{ width: '100%', height: '400px' }}
            >
              <div id='map-container'>
                <MapWrapper
                  events={events}
                  center={{ lat: 34.021, lng: -118.286 }}
                  clickedEventId={clickedEventId}
                  zoom={15.3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setPage: PropTypes.func.isRequired,
  getCatalogueEvents: PropTypes.func.isRequired,
  clearCatalogue: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  catalogue: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  catalogue: state.catalogue,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getCatalogueEvents,
    clearCatalogue,
    setPage
  }
)(Dashboard);
