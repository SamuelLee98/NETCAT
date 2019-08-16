import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import FeaturedEvent from './FeaturedEvent';
import MoreEvent from './MoreEvent';
import Spinner from '../layout/Spinner';
import MapWrapper from '../map/MapWrapper';
import ServerError from '../layout/ServerError';

// Actions
import {
  setPage,
  getMoreEvents,
  getFeaturedEvents,
  clearEvents
} from '../../actions/event';
import { getCatalogueEventIds } from '../../actions/catalogue';

// utils
import checkIfCatalogued from '../../utils/checkIfCatalogued';

// Images, delete later
import facebook from './images/facebook.png';
import amazon from './images/amazon.png';
import NBC from './images/NBC.png';
import vayner from './images/vayner.png';
const images = [facebook, amazon, NBC, vayner];

const Content = ({
  setPage,
  getFeaturedEvents,
  getMoreEvents,
  getCatalogueEventIds,
  clearEvents,
  event,
  catalogue,
  page
}) => {
  // Data from redux
  const moreEvents = useCallback(event.more.events, [event.more.events]);
  const moreLoading = useCallback(event.more.loading, [event.more.loading]);
  const featuredEvents = useCallback(event.featured.events, [
    event.featured.events
  ]);
  const featuredLoading = useCallback(event.featured.loading, [
    event.featured.loading
  ]);

  // Catalogue-labeled events
  const [moreEventsLabelled, setMoreEventsLabelled] = useState(null);
  const [featuredEventsLabelled, setfeaturedEventsLabelled] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(page);
    getFeaturedEvents(page);
    getMoreEvents(page);
    getCatalogueEventIds();

    return () => clearEvents();
  }, [
    page,
    setPage,
    getFeaturedEvents,
    getMoreEvents,
    getCatalogueEventIds,
    clearEvents
  ]);

  useEffect(() => {
    if (
      moreEvents !== null &&
      featuredEvents !== null &&
      !moreLoading &&
      !featuredLoading &&
      !catalogue.loading
    ) {
      let more = checkIfCatalogued(moreEvents, catalogue.ids);
      let featured = checkIfCatalogued(featuredEvents, catalogue.ids);

      setMoreEventsLabelled(more);
      setfeaturedEventsLabelled(featured);
    }
  }, [
    moreEvents,
    featuredEvents,
    moreLoading,
    featuredLoading,
    catalogue.loading,
    catalogue.ids
  ]);

  if (
    (event.error && event.error.status === 500) ||
    (catalogue.error && catalogue.error.status === 500)
  ) {
    return <ServerError />;
  }

  if (
    moreLoading ||
    featuredLoading ||
    catalogue.loading ||
    moreEventsLabelled === null ||
    featuredEventsLabelled === null
  ) {
    return <Spinner />;
  }

  return (
    <div className='content'>
      <div className='container'>
        <h3 style={{ textAlign: 'center' }}>Featured Events</h3>
        <div className='row'>
          {featuredEventsLabelled.length === 0 ? (
            <div className='col'>
              <h5 style={{ color: 'grey', textAlign: 'center' }}>
                Nothing here at the moment :(
              </h5>
            </div>
          ) : (
            featuredEventsLabelled.map((event, index) => (
              <FeaturedEvent
                key={event._id}
                event={event}
                image={images[index]}
              />
            ))
          )}
        </div>
        <div className='d-flex justify-content-end'>
          <Link className='btn btn-link text-danger' to='/explore'>
            Explore More Events
          </Link>
        </div>

        <hr />
        <h3 style={{ textAlign: 'center', marginTop: '20px' }}>More Events</h3>
        <div className='container'>
          <div
            className='d-none d-md-block map'
            id='map'
            style={{ width: '100%', height: '400px' }}
          >
            <MapWrapper
              events={moreEventsLabelled}
              center={{ lat: 34.021, lng: -118.286 }}
              zoom={15.3}
            />
          </div>
          <br />
          <br />
          <div className='moreEvents' id='moreEvents' style={{ width: '100%' }}>
            <div className='row'>
              {moreEventsLabelled.length === 0 ? (
                <div className='col'>
                  <h5 style={{ color: 'grey', textAlign: 'center' }}>
                    Nothing here at the moment :(
                  </h5>
                  <hr />
                </div>
              ) : (
                moreEventsLabelled.map(event => (
                  <MoreEvent key={event._id} event={event} />
                ))
              )}
            </div>
          </div>
          <div className='d-flex justify-content-end'>
            <Link className='btn btn-link text-danger' to='/explore'>
              Explore More Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  setPage: PropTypes.func.isRequired,
  getMoreEvents: PropTypes.func.isRequired,
  getFeaturedEvents: PropTypes.func.isRequired,
  getCatalogueEventIds: PropTypes.func.isRequired,
  clearEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  catalogue: PropTypes.object.isRequired,
  page: PropTypes.string
};

const mapStateToProps = state => ({
  event: state.event,
  catalogue: state.catalogue
});

export default connect(
  mapStateToProps,
  {
    setPage,
    getMoreEvents,
    getFeaturedEvents,
    getCatalogueEventIds,
    clearEvents
  }
)(Content);
