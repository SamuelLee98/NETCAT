import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardContent from '../layout/CardContent';

const EventCard = ({ event, onEventCardClick }) => {
  const [cardHeight, setCardHeight] = useState(null);

  return (
    <div
      id='event-card'
      className='card mb-3'
      onClick={e => onEventCardClick(e, event._id)}
    >
      <div className='row'>
        <div className='col-12 col-md-4'>
          <img
            src={event.thumbnailUrl}
            className='card-img'
            alt='Responsive Thumbnail'
            style={{
              height: cardHeight === null ? '100%' : cardHeight,
              objectFit: 'cover'
            }}
          />
        </div>
        <div className='col-12 col-md-8'>
          <CardContent
            event={event}
            page='more'
            setCardHeight={setCardHeight}
          />
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onEventCardClick: PropTypes.func.isRequired
};

export default EventCard;
