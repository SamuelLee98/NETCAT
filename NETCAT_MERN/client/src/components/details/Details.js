import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import qs from 'query-string';
import AddToCalendar from 'react-add-to-calendar';

// Actions
import { getEvent, getFeaturedEvent } from '../../actions/event';
import { openModal } from '../../actions/modal';

// Components
import Spinner from '../layout/Spinner';
import MapWrapper from '../map/MapWrapper';
import NotFound from '../layout/NotFound';
import ServerError from '../layout/ServerError';

// css
import './details.css';

// Img, delete later
import facebook from '../content/images/facebook.png';

const Details = ({
  loading,
  event,
  error,
  match,
  location,
  getEvent,
  getFeaturedEvent,
  openModal
}) => {
  // get featured query param from url
  const featureParam = qs.parse(location.search).featured;
  const featured = featureParam && featureParam === 'true' ? true : false;

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
    if (featured) getFeaturedEvent(match.params.id);
    else getEvent(match.params.id);
  }, [featured, match, getEvent, getFeaturedEvent]);

  if (error && error.status === 404) {
    return <NotFound />;
  }

  if (error && error.status === 500) {
    return <ServerError />;
  }

  if (loading || !event || error) {
    return <Spinner />;
  }

  return (
    <div className='content container'>
      <div className='row'>
        <div className='col-md-1' />
        <div className='col-md-10 my-2'>
          <div className='card mb-3'>
            <div className='map' id='map'>
              <MapWrapper
                events={[event]}
                center={{
                  lat: event.location.latitude,
                  lng: event.location.longitude
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
              <h3 className='card-title'>{event.title}</h3>
              <h6>Location: {event.location.room}</h6>
              <h6>
                Time:{` `}
                <Moment format='hh:mm A'>{event.date.from}</Moment> -{` `}
                <Moment format='hh:mm A'>{event.date.to}</Moment> {`, `}
                <Moment format='dddd MMMM D, YYYY'>{event.date.from}</Moment>
              </h6>
              <p className='card-text'>{event.description}</p>
              <div className='row justify-content-center'>
                <button
                  className='btn btn-danger btn-lg btn-block m-1'
                  style={{
                    maxWidth: '500px',
                    paddingLeft: '0',
                    paddingRight: '0'
                  }}
                >
                  <AddToCalendar
                    event={{
                      title: event.title,
                      description: event.description,
                      location: event.location.address,
                      startTime: event.date.from,
                      endTime: event.date.to
                    }}
                    buttonTemplate={{ calendar: 'left' }}
                  />
                </button>
                <div className='w-100' />
                <button
                  onClick={() => {
                    openModal(featured, event._id);
                  }}
                  className='btn btn-danger btn-lg btn-block m-1'
                  style={{ maxWidth: '500px' }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-1' />
      </div>
    </div>
  );
};

Details.propTypes = {
  getEvent: PropTypes.func.isRequired,
  getFeaturedEvent: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.event.loading,
  event: state.event.event,
  error: state.event.error
});

export default connect(
  mapStateToProps,
  { getEvent, getFeaturedEvent, openModal }
)(Details);
