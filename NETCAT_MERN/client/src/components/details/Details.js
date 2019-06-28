import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getEvent, getFeaturedEvent } from '../../actions/event';
import Spinner from '../layout/Spinner';
import MapWrapper from '../map/MapWrapper';

// css
import './details.css';

// Img, delete later
import facebook from '../content/images/facebook.png';

const Details = ({ match, event, getEvent, getFeaturedEvent, location }) => {
  const [loading, toggleLoading] = useState(true);

  useEffect(() => {
    const getFeaturedData = async () => {
      await getFeaturedEvent(match.params.id);
      console.log('toggleLoading');
      toggleLoading(false);
    };

    const getData = async () => {
      await getEvent(match.params.id);
      console.log('toggleLoading');
      toggleLoading(false);
    };

    // If no featured prop passed in, then location.state is null
    if (location.state != null && location.state.featured === true) {
      getFeaturedData();
    } else {
      getData();
    }
  }, [getEvent, getFeaturedEvent, match.params.id, location, loading]);

  return loading ? (
    <Spinner />
  ) : !event ? (
    // If finished loading but still no event exists, return not found
    <Redirect to='/not-found' />
  ) : (
    <div className='content no-padding'>
      <div className='container-fluid no-padding'>
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
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
          </div>
        </div>
      </div>
      <div className='content'>
        <h3 style={{ textAlign: 'center' }} id='event-title'>
          {event.title}
        </h3>
        <div className='row'>
          <div className='col-12' style={{ textAlign: 'center' }}>
            <img
              src={facebook}
              id='featured-thumbnail'
              className='img-responsive img-thumbnail'
              alt='Responsive Thumbnail'
            />
          </div>
          <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2' />
          <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
            <h6 id='location'>Location: {event.location.room}</h6>
            <h6 id='time'>
              Time:{` `}
              <Moment format='hh:mm A'>{event.date.from}</Moment> -{` `}
              <Moment format='hh:mm A'>{event.date.to}</Moment>
              <br />
              <Moment format='dddd, MMMM D, YYYY'>
                {event.date.from}
              </Moment>{' '}
            </h6>
            <h6 id='description'>{event.description}</h6>
          </div>
          <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2' />
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  getEvent: PropTypes.func.isRequired,
  getFeaturedEvent: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object,
  featured: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.event.loading,
  event: state.event.event
});

export default connect(
  mapStateToProps,
  { getEvent, getFeaturedEvent }
)(Details);
