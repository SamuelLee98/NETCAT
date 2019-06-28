import React, { useEffect } from 'react';
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
  setSchool,
  getIndexEvents,
  getIndexFeaturedEvents
} from '../../actions/event';
import { toggleModalDisplay } from '../../actions/modal';

// Images, delete later
import facebook from './images/facebook.png';
import amazon from './images/amazon.png';
import NBC from './images/NBC.png';
import vayner from './images/vayner.png';
const images = [facebook, amazon, NBC, vayner];

const Content = ({
  setSchool,
  getIndexFeaturedEvents,
  getIndexEvents,
  toggleModalDisplay,
  event: {
    events: { events },
    featured: { featured },
    loading,
    error
  },
  school
}) => {
  useEffect(() => {
    setSchool(school);
    getIndexFeaturedEvents(school);
    getIndexEvents(school);
  }, [setSchool, getIndexFeaturedEvents, getIndexEvents, school]);

  if (error && error.status === 500) {
    return <ServerError />;
  }
  if (loading || !events || !featured) {
    return <Spinner />;
  }

  return (
    <div className='content'>
      <div className='container'>
        <h3 style={{ textAlign: 'center' }}>Featured Events</h3>
        <div className='row'>
          {featured.map((event, index) => (
            <FeaturedEvent
              key={event._id}
              event={event}
              image={images[index]}
              toggleModalDisplay={toggleModalDisplay}
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
              events={events}
              center={{ lat: 34.021, lng: -118.286 }}
              zoom={15.3}
            />
          </div>
          <br />
          <br />
          <div className='moreEvents' id='moreEvents' style={{ width: '100%' }}>
            <div className='row'>
              {events.map(event => (
                <MoreEvent
                  key={event._id}
                  event={event}
                  toggleModalDisplay={toggleModalDisplay}
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
  setSchool: PropTypes.func.isRequired,
  getIndexEvents: PropTypes.func.isRequired,
  getIndexFeaturedEvents: PropTypes.func.isRequired,
  toggleModalDisplay: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  school: PropTypes.string
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  { setSchool, getIndexEvents, getIndexFeaturedEvents, toggleModalDisplay }
)(Content);
