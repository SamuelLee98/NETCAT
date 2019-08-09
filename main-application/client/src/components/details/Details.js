import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

// Actions
import { getEventById } from '../../actions/event';
import { getCatalogueEventIds } from '../../actions/catalogue';

// Components
import Spinner from '../layout/Spinner';
import MapWrapper from '../map/MapWrapper';
import NotFound from '../layout/NotFound';
import ServerError from '../layout/ServerError';
import CardButtons from '../layout/CardButtons';

// utils
import checkIfCatalogued from '../../utils/checkIfCatalogued';

// css
import './details.css';

// Img, delete later
import facebook from '../content/images/facebook.png';

const Details = ({
  event,
  match,
  getEventById,
  getCatalogueEventIds,
  catalogue
}) => {
  const [eventData, changeEventData] = useState(null);
  console.log(eventData === null);

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
    getEventById(match.params.id);
    getCatalogueEventIds();
  }, [match, getEventById, getCatalogueEventIds]);

  useEffect(() => {
    if (event.event && !event.loading && !catalogue.loading) {
      // checkIfCatalogued takes in array and return array
      let cataloguedEvent = checkIfCatalogued([event.event], catalogue.ids)[0];
      changeEventData(cataloguedEvent);
    }
  }, [event, catalogue, changeEventData]);

  if (event.error && event.error.status === 404) {
    return <NotFound />;
  }

  if (
    (event.error && event.error.status === 500) ||
    (catalogue.error && catalogue.error.status === 500)
  ) {
    return <ServerError />;
  }

  if (event.loading || catalogue.loading || eventData === null) {
    return <Spinner />;
  }

  return (
    <div className='content container'>
      <div className='row'>
        <div className='d-none d-md-block col-md-1' />
        <div className='col-12 col-md-10 my-2'>
          <div className='card mb-3'>
            <div className='map' id='map'>
              <MapWrapper
                events={[eventData]}
                center={{
                  lat: eventData.location.latitude,
                  lng: eventData.location.longitude
                }}
                zoom={15.3}
              />
            </div>
            <img
              src={facebook}
              id='featured-thumbnail'
              className='img-thumbnail my-2 mx-auto'
              alt='Responsive Thumbnail'
              style={{ minHeight: '200px', maxHeight: '400px' }}
            />
            <div className='card-body'>
              <h3 className='card-title'>{eventData.title}</h3>
              <h6>Location: {eventData.location.room}</h6>
              <h6>
                Time:{` `}
                <Moment format='hh:mm A'>{eventData.date.from}</Moment> -{` `}
                <Moment format='hh:mm A'>{eventData.date.to}</Moment> {`, `}
                <Moment format='dddd MMMM D, YYYY'>
                  {eventData.date.from}
                </Moment>
              </h6>
              <p className='card-text'>{eventData.description}</p>
              <CardButtons
                isCatalogued={eventData.isCatalogued}
                eventId={eventData._id}
                page='details'
              />
            </div>
          </div>
        </div>
        <div className='d-none d-md-block col-md-1' />
      </div>
    </div>
  );
};

Details.propTypes = {
  getEventById: PropTypes.func.isRequired,
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
  { getEventById, getCatalogueEventIds }
)(Details);
