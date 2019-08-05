import React, { useEffect, useState } from 'react';
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
  getIndexEvents,
  getIndexFeaturedEvents
} from '../../actions/event';
import { openModal } from '../../actions/modal';
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
  getIndexFeaturedEvents,
  getIndexEvents,
  getCatalogueEventIds,
  openModal,
  event,
  catalogue,
  page
}) => {
  const [eventData, changeEventData] = useState({
    events: [],
    featured: []
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(page);
    getIndexFeaturedEvents(page);
    getIndexEvents(page);
    getCatalogueEventIds();
  }, [
    setPage,
    getIndexFeaturedEvents,
    getIndexEvents,
    page,
    getCatalogueEventIds
  ]);

  useEffect(() => {
    if (
      event.events.events &&
      event.featured.featured &&
      !event.loading &&
      !catalogue.loading
    ) {
      let events = checkIfCatalogued(event.events.events, catalogue.ids);
      let featured = checkIfCatalogued(event.featured.featured, catalogue.ids);

      changeEventData({
        events,
        featured
      });
    }
  }, [event, catalogue]);

  if (
    (event.error && event.error.status === 500) ||
    (catalogue.error && catalogue.error.status === 500)
  ) {
    return <ServerError />;
  }

  if (event.loading || catalogue.loading) {
    return <Spinner />;
  }

  return (
    <div className='content'>
      <div className='container'>
        <h3 style={{ textAlign: 'center' }}>Featured Events</h3>
        <div className='row'>
          {eventData.featured.map((event, index) => (
            <FeaturedEvent
              key={event._id}
              event={event}
              image={images[index]}
              openModal={openModal}
            />
          ))}
        </div>
        <hr />
        <h3 style={{ textAlign: 'center', marginTop: '20px' }}>More Events</h3>
        <div className='container'>
          <div
            className='map'
            id='map'
            style={{ width: '100%', height: '400px' }}
          >
            <MapWrapper
              events={eventData.events}
              center={{ lat: 34.021, lng: -118.286 }}
              zoom={15.3}
            />
          </div>
          <br />
          <br />
          <div className='moreEvents' id='moreEvents' style={{ width: '100%' }}>
            <div className='row'>
              {eventData.events.map(event => (
                <MoreEvent
                  key={event._id}
                  event={event}
                  openModal={openModal}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  setPage: PropTypes.func.isRequired,
  getIndexEvents: PropTypes.func.isRequired,
  getIndexFeaturedEvents: PropTypes.func.isRequired,
  getCatalogueEventIds: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
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
    getIndexEvents,
    getIndexFeaturedEvents,
    getCatalogueEventIds,
    openModal
  }
)(Content);
