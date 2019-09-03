import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AdminCardContent from './AdminCardContent';

const AdminEventCard = ({ event }) => {
  const [cardHeight, setCardHeight] = useState(null);

  return (
    <div id='event-card' className='card mb-3'>
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
          <AdminCardContent event={event} setCardHeight={setCardHeight} />
        </div>
      </div>
    </div>
  );
};

AdminEventCard.propTypes = {
  event: PropTypes.object.isRequired
};

export default AdminEventCard;
