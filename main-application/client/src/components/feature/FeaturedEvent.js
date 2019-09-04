import React from 'react';
import CardContent from '../layout/CardContent';

const FeaturedEvent = ({ event, onEventCardClick }) => {
  return (
    <div
      id='event-card'
      className='card'
      onClick={e => onEventCardClick(e, event._id)}
    >
      <img
        src={event.thumbnailUrl}
        id='featured-thumbnail'
        className='card-img-top img-fluid'
        alt='Responsive Thumbnail'
      />
      <div className='card-block'>
        <CardContent event={event} page='feature' />
      </div>
    </div>
  );
};

export default FeaturedEvent;
