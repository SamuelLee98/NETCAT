import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

// Actions
import { getEventById, clearEvents } from '../../actions/event';
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

const Details = ({
  event,
  match,
  getEventById,
  clearEvents,
  getCatalogueEventIds,
  catalogue
}) => {
  const detailsEvent = useCallback(event.details.event, [event.details.event]);
  const detailsLoading = useCallback(event.details.loading, [
    event.details.loading
  ]);
  const [detailsEventLabelled, setDetailsEventLabelled] = useState(null);

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
    getEventById(match.params.id);
    getCatalogueEventIds();
    return () => clearEvents();
  }, [match, getEventById, getCatalogueEventIds, clearEvents]);

  useEffect(() => {
    if (detailsEvent && !detailsLoading && !catalogue.loading) {
      // checkIfCatalogued takes in array and return array
      let labelledDetailsEvent = checkIfCatalogued(
        [detailsEvent],
        catalogue.ids
      )[0];
      setDetailsEventLabelled(labelledDetailsEvent);
    }
  }, [detailsEvent, detailsLoading, catalogue.loading, catalogue.ids]);

  if (
    (event.error && event.error.status === 500) ||
    (catalogue.error && catalogue.error.status === 500)
  ) {
    return <ServerError />;
  }

  if (event.error && event.error.status === 404) {
    return <NotFound />;
  }

  if (detailsLoading || catalogue.loading || detailsEventLabelled === null) {
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
                events={[detailsEventLabelled]}
                center={{
                  lat: detailsEventLabelled.location.latitude,
                  lng: detailsEventLabelled.location.longitude
                }}
                zoom={15.3}
              />
            </div>
            <img
              src={detailsEventLabelled.thumbnailUrl}
              id='featured-thumbnail'
              className='img-thumbnail my-2 mx-auto'
              alt='Responsive Thumbnail'
              style={{ minHeight: '200px', maxHeight: '400px' }}
            />
            <div className='card-body'>
              <h3 className='card-title'>{detailsEventLabelled.title}</h3>
              <h6>Location: {detailsEventLabelled.location.room}</h6>
              <h6>
                Time:{` `}
                <Moment format='hh:mm A'>
                  {detailsEventLabelled.date.from}
                </Moment>{' '}
                -{` `}
                <Moment format='hh:mm A'>
                  {detailsEventLabelled.date.to}
                </Moment>{' '}
                {`, `}
                <Moment format='dddd MMMM D, YYYY'>
                  {detailsEventLabelled.date.from}
                </Moment>
              </h6>
              <p className='card-text'>{detailsEventLabelled.description}</p>
              <CardButtons
                isCatalogued={detailsEventLabelled.isCatalogued}
                eventId={detailsEventLabelled._id}
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
  clearEvents: PropTypes.func.isRequired,
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
  { getEventById, clearEvents, getCatalogueEventIds }
)(Details);
