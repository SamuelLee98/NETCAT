import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import FeaturedEvent from './FeaturedEvent';
import Spinner from '../layout/Spinner';
import MapWrapper from '../map/MapWrapper';
import ServerError from '../layout/ServerError';

// Actions
import { setPage, getFeaturedEvents, clearEvents } from '../../actions/event';
import { getCatalogueEventIds } from '../../actions/catalogue';

// utils
import checkIfCatalogued from '../../utils/checkIfCatalogued';

// css
import './Feature.css';

const Feature = ({
  setPage,
  getFeaturedEvents,
  getCatalogueEventIds,
  clearEvents,
  event,
  catalogue,
  page
}) => {
  // Data from redux
  const featuredEvents = useCallback(event.featured.events, [
    event.featured.events
  ]);
  const featuredLoading = useCallback(event.featured.loading, [
    event.featured.loading
  ]);

  // Catalogue-labeled events
  const [featuredEventsLabelled, setfeaturedEventsLabelled] = useState(null);

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
    setPage(page);
    getFeaturedEvents(page);
    getCatalogueEventIds();

    return () => clearEvents();
  }, [page, setPage, getFeaturedEvents, getCatalogueEventIds, clearEvents]);

  useEffect(() => {
    if (featuredEvents !== null && !featuredLoading && !catalogue.loading) {
      let featured = checkIfCatalogued(featuredEvents, catalogue.ids);
      setfeaturedEventsLabelled(featured);
    }
  }, [featuredEvents, featuredLoading, catalogue.loading, catalogue.ids]);

  if (
    (event.error && event.error.status === 500) ||
    (catalogue.error && catalogue.error.status === 500)
  ) {
    return <ServerError />;
  }

  if (featuredLoading || catalogue.loading || featuredEventsLabelled === null) {
    return <Spinner />;
  }

  return (
    <div className='content'>
      <div className='container'>
        <h3 className='text-center text-monospace'>
          Featured<span className='text-capitalize'> {page}</span> Events
        </h3>
        <hr />
        <div className='d-none d-lg-block'>
          <div className='row'>
            <div className='col-5'>
              <div className='sticky-container'>
                <div className='mb-3' id='map-container'>
                  <MapWrapper
                    events={featuredEventsLabelled}
                    center={{ lat: 34.021, lng: 118.286 }}
                    zoom={15.3}
                    clickedEventId={clickedEventId}
                  />
                </div>
                <hr />
                <div className='d-flex justify-content-center'>
                  <Link
                    className='btn btn-link btn-lg text-danger'
                    to='/explore'
                  >
                    Explore More Events
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-7'>
              {featuredEventsLabelled.length === 0 ? (
                <h5 id='no-content'>Nothing here at the moment :(</h5>
              ) : (
                <div className='card-columns'>
                  {featuredEventsLabelled.map(event => (
                    <FeaturedEvent
                      key={event._id}
                      event={event}
                      onEventCardClick={onEventCardClick}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className='mb-4' id='map-container'>
          <MapWrapper
            events={featuredEventsLabelled}
            center={{ lat: 34.021, lng: -118.286 }}
            zoom={15.3}
          />
        </div> */}

        <div className='d-block d-lg-none'>
          {featuredEventsLabelled.length === 0 ? (
            <h5 id='no-content'>Nothing here at the moment :(</h5>
          ) : (
            <div className='card-columns'>
              {featuredEventsLabelled.map(event => (
                <FeaturedEvent key={event._id} event={event} />
              ))}
            </div>
          )}
          <div className='d-flex justify-content-center'>
            <Link className='btn btn-link btn-lg text-danger' to='/explore'>
              Explore More Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Feature.propTypes = {
  setPage: PropTypes.func.isRequired,
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
    getFeaturedEvents,
    getCatalogueEventIds,
    clearEvents
  }
)(Feature);
