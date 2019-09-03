import React, { Fragment, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import { setPage, getExploreEvents, clearEvents } from '../../actions/event';

// Components
import ServerError from '../layout/ServerError';
import SearchDropdown from '../search-dropdown/SeachDropdown';
import AdminEventCard from './AdminEventCard';
import Spinner from '../layout/Spinner';

// Spinner svg
import spinner from '../layout/spinner.svg';

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

const ExploreMore = ({ setPage, getExploreEvents, clearEvents, event }) => {
  const [currEvents, setCurrEvents] = useState(null);
  const [currOffset, setCurrOffset] = useState(0);
  const [hasMore, toggleHasMore] = useState(true);
  const events = useCallback(event.explore.events, [event.explore.events]);
  const eventLoading = useCallback(event.explore.loading, [
    event.explore.loading
  ]);

  // Filters
  const [searchField, setSearchField] = useState({
    school: '',
    featured: '',
    tags: ''
  });

  const handleSearchClick = useCallback(() => {
    // Set currEvents to null to trigger useEffect
    setCurrEvents(null);
    toggleHasMore(true);
    getExploreEvents(
      searchField.school,
      searchField.featured,
      searchField.tags
    );
  }, [searchField, getExploreEvents]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('dashboard');
    getExploreEvents();
    return () => clearEvents();
  }, [setPage, getExploreEvents, clearEvents]);

  useEffect(() => {
    // Initialize events
    if (events !== null && !eventLoading && currEvents === null) {
      let newEvents = events.slice(0, eventsPerPage);
      setCurrOffset(eventsPerPage);
      setCurrEvents(newEvents);
    }
  }, [events, eventLoading, currEvents]);

  // On toggle feature click
  useEffect(() => {
    if (events !== null) {
      let newEvents = events.slice(0, currOffset);
      setCurrEvents(newEvents);
    }
  }, [events]);

  const loadEvents = useCallback(() => {
    let newEvents = events.slice(currOffset, currOffset + eventsPerPage);
    setCurrEvents([...currEvents, ...newEvents]);
    setCurrOffset(currOffset + eventsPerPage);

    if (events.length <= currOffset + eventsPerPage) {
      toggleHasMore(false);
    }
  }, [currOffset, currEvents, events]);

  if (event.error && event.error.status === 500) {
    return <ServerError />;
  }

  return (
    <div className='content'>
      <div className='container'>
        <h1
          className='large text-dark mb-4'
          style={{ fontFamily: 'helvetica-bold' }}
        >
          Admin Dashboard
        </h1>
        <SearchDropdown
          searchField={searchField}
          setSearchField={setSearchField}
          handleSearchClick={handleSearchClick}
        />
        <hr />
        {events === null || eventLoading || currEvents === null ? (
          <Spinner />
        ) : (
          <div className='row'>
            <div className='col-12'>
              <InfiniteScroll
                pageStart={0}
                loadMore={() => loadEvents()}
                hasMore={hasMore}
                loader={Loader}
              >
                {currEvents.map(event => (
                  <AdminEventCard key={event._id} event={event} />
                ))}
              </InfiniteScroll>
              {!hasMore &&
                (events.length === 0 ? (
                  <h5 id='no-content'>Nothing here at the moment :(</h5>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ExploreMore.propTypes = {
  setPage: PropTypes.func.isRequired,
  getExploreEvents: PropTypes.func.isRequired,
  clearEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  { setPage, getExploreEvents, clearEvents }
)(ExploreMore);
