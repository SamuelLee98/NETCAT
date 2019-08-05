import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import { setPage, getMoreEvents } from '../../actions/event';
import { getCatalogueEventIds } from '../../actions/catalogue';

// Components
import Spinner from '../layout/Spinner';
import ServerError from '../layout/ServerError';
import EventCard from './EventCard';
import Pagination from '../layout/Pagination';

// utils
import checkIfCatalogued from '../../utils/checkIfCatalogued';

const MoreEvents = ({
  setPage,
  getMoreEvents,
  getCatalogueEventIds,
  event,
  catalogue
}) => {
  const eventsPerPage = 10;

  const [eventData, changeEventData] = useState({
    pageCount: 0,
    currPageEvents: []
  });

  const [currPageNo, setCurrPageNo] = useState(0);

  const [initialLoad, toggleInitialLoad] = useState(true);

  /**
   * EXPLAINING PURPOSE OF TWO USEEFFECT!!!
   *
   * Say we have:
   *
   * useEffect(() => {
   *  window.scrollTo(0,0);
   *  setPage('more');
   *  getMoreEvents(); // This function is async
   *  changeEventData({
   *    pageCount: Math.ceil(events.length / eventsPerPage),
   *    currPageEvents: events.slice(0, eventsPerPage)
   *  });
   * }, [setPage, getMoreEvents])
   *
   * All functions in useEffect are run with the same snapshot of the current
   * state. That means, window.scrollTo, setPage, getMoreEvents, and
   * changeMoreEvents all have events = [] and loading = false when they are
   * executed Even after getMoreEvents finishes and new events are loaded,
   * changeMoreEvents still have access to the old state of the props.
   *
   * Note that since we don't have 'events' in the dependency array of this
   * useEffect, it won't run again once new events are loaded. Therefore,
   * changeEventData never gets access to newly loaded 'events' prop.
   *
   * Say we now have:
   *
   * useEffect(() => {
   *  window.scrollTo(0,0);
   *  setPage('more');
   *  getMoreEvents();
   *  if(!loading) {
   *    changeEventData(...);
   *  }
   * }, [setPage, getMoreEvents, loading]);
   *
   * This useEffect causes an infinite loop. Note that once new events load,
   * loading becomes false, which cause this useEffect to run again. This will
   * execute getMoreEvents() again, which will set loading to true again.
   * Changing the value of loading will cause the useEffect to run one more
   * time, resulting in infinite loop.
   *
   * The solution is to have changeEventData in a seperate useEffect as such:
   */

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('more');
    getMoreEvents();
    getCatalogueEventIds();
  }, [setPage, getMoreEvents, getCatalogueEventIds]);

  // Run this useEffect the first time events are loaded
  useEffect(() => {
    // Wait for events and catalogue to finish loading
    if (event.events.events && !event.loading && !catalogue.loading) {
      // Initial load when events are first loaded
      if (initialLoad) {
        // Set initial load to false
        toggleInitialLoad(false);

        // Calculate page count
        const pageCount = Math.ceil(event.events.events.length / eventsPerPage);
        let currPageEvents = event.events.events.slice(0, eventsPerPage);

        // Check whether loaded events exist in user's catalogue

        currPageEvents = checkIfCatalogued(currPageEvents, catalogue.ids);

        changeEventData({
          pageCount,
          currPageEvents
        });
      }
    }
  }, [event, catalogue]);

  // Run this useEffect when user clicks on add/remove button
  useEffect(() => {
    if (!initialLoad) {
      // Calculate page no. of target event
      let offset = Math.ceil(currPageNo * eventsPerPage);

      // Reload the page where add/remove clicked
      let currPageEvents = event.events.events.slice(
        offset,
        offset + eventsPerPage
      );

      currPageEvents = checkIfCatalogued(currPageEvents, catalogue.ids);

      changeEventData({
        ...eventData,
        currPageEvents
      });
    }
  }, [catalogue.ids]);

  const handlePageClick = data => {
    window.scrollTo(0, 0);
    let currPageNo = data.selected;
    setCurrPageNo(currPageNo);
    let offset = Math.ceil(currPageNo * eventsPerPage);
    let currPageEvents = event.events.events.slice(
      offset,
      offset + eventsPerPage
    );

    currPageEvents = checkIfCatalogued(currPageEvents, catalogue.ids);

    changeEventData({
      ...eventData,
      currPageEvents
    });
  };

  if (
    (event.error && event.error.status === 500) ||
    (catalogue.error && catalogue.error.status === 500)
  ) {
    return <ServerError />;
  }

  return event.loading || catalogue.loading ? (
    <Spinner />
  ) : (
    <div className='content container'>
      <h1
        className='large text-dark mb-4'
        style={{ fontFamily: 'helvetica-bold' }}
      >
        Explore More Events Around You
      </h1>
      <hr />
      <div>
        {eventData.currPageEvents.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <Pagination
        pageCount={eventData.pageCount}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

MoreEvents.propTypes = {
  setPage: PropTypes.func.isRequired,
  getMoreEvents: PropTypes.func.isRequired,
  getCatalogueEventIds: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  catalogue: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  catalogue: state.catalogue
});

export default connect(
  mapStateToProps,
  { setPage, getMoreEvents, getCatalogueEventIds }
)(MoreEvents);
