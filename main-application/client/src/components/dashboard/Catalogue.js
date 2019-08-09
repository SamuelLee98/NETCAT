import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import CardButtons from '../layout/CardButtons';

import facebook from '../content/images/facebook.png';

const Catalogue = ({ event, handleDeleteEvent }) => {
  return (
    <div className='card mb-3'>
      <div className='row'>
        <div className='col-12 col-md-4'>
          <img
            src={facebook}
            className='card-img'
            alt='Responsive Thumbnail'
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className='col-12 col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{event.title}</h5>
            <Moment format='hh:mm A'>{event.datefrom}</Moment> -{` `}
            <Moment format='hh:mm A'>{event.date.to}</Moment>
            <br />
            <Moment format='dddd, MMMM D, YYYY'>{event.date.from}</Moment>
            <br />
            {event.location.room}
            <br />
            Type: {event.type}
            <br />
            <br />
            <CardButtons
              isCatalogued={true}
              eventId={event._id}
              handleDeleteEvent={handleDeleteEvent}
              page='catalogue'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Catalogue.propTypes = {
  event: PropTypes.object.isRequired
};

export default Catalogue;
