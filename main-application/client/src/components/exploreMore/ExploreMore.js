import React, { Fragment, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

// Actions
import { setPage, getExploreEvents, clearEvents } from '../../actions/event';
import { getCatalogueEventIds } from '../../actions/catalogue';

// Components
import ServerError from '../layout/ServerError';
import EventCard from './EventCard';
import MapWrapper from '../map/MapWrapper';
import Spinner from '../layout/Spinner';

// utils
import checkIfCatalogued from '../../utils/checkIfCatalogued';

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

const ExploreMore = ({
  setPage,
  getExploreEvents,
  getCatalogueEventIds,
  clearEvents,
  event,
  catalogue
}) => {
  const [currEvents, setCurrEvents] = useState(null);
  const [currOffset, setCurrOffset] = useState(0);
  const [hasMore, toggleHasMore] = useState(true);
  const events = useCallback(event.explore.events, [event.explore.events]);
  const eventLoading = useCallback(event.explore.loading, [
    event.explore.loading
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('explore');
    getExploreEvents();
    getCatalogueEventIds();
    return () => clearEvents();
  }, [setPage, getExploreEvents, getCatalogueEventIds, clearEvents]);

  useEffect(() => {
    // Initialize events
    if (
      events !== null &&
      !eventLoading &&
      !catalogue.loading &&
      currEvents === null
    ) {
      let newEvents = events.slice(0, eventsPerPage);
      newEvents = checkIfCatalogued(newEvents, catalogue.ids);
      setCurrOffset(eventsPerPage);
      setCurrEvents(newEvents);
    }
  }, [events, eventLoading, catalogue.loading, catalogue.ids, currEvents]);

  // On add/remove from catalogue click
  useEffect(() => {
    if (currEvents !== null) {
      let newCurrEvents = checkIfCatalogued(currEvents, catalogue.ids);
      setCurrEvents(newCurrEvents);
    }
  }, [catalogue.ids]);

  const loadEvents = useCallback(() => {
    let newEvents = events.slice(currOffset, currOffset + eventsPerPage);
    newEvents = checkIfCatalogued(newEvents, catalogue.ids);
    setCurrEvents([...currEvents, ...newEvents]);
    setCurrOffset(currOffset + eventsPerPage);

    if (events.length <= currOffset + eventsPerPage) {
      toggleHasMore(false);
    }
  }, [currOffset, catalogue.ids, currEvents, events]);

  if (
    (event.error && event.error.status === 500) ||
    (catalogue.error && catalogue.error.status === 500)
  ) {
    return <ServerError />;
  }

  return events === null ||
    eventLoading ||
    catalogue.idsLoading ||
    currEvents === null ? (
    <Spinner />
  ) : (
    <div className='content'>
      <div className='container'>
        <h1
          className='large text-dark mb-4'
          style={{ fontFamily: 'helvetica-bold' }}
        >
          Explore More Events Around USC
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
              {currEvents.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </InfiniteScroll>
            {!hasMore &&
              (events.length === 0 ? (
                <h5 style={{ color: 'grey', textAlign: 'center' }}>
                  Nothing here at the moment :(
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
          </div>

          <div className='d-none d-lg-block col-lg-4'>
            <div
              className='map sticky-top'
              id='map'
              style={{ width: '100%', height: '400px' }}
            >
              <MapWrapper
                events={currEvents}
                center={{ lat: 34.021, lng: -118.286 }}
                zoom={15.3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ExploreMore.propTypes = {
  setPage: PropTypes.func.isRequired,
  getExploreEvents: PropTypes.func.isRequired,
  getCatalogueEventIds: PropTypes.func.isRequired,
  clearEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  catalogue: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  catalogue: state.catalogue
});

export default connect(
  mapStateToProps,
  { setPage, getExploreEvents, getCatalogueEventIds, clearEvents }
)(ExploreMore);
