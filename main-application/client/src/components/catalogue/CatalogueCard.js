import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardContent from '../layout/CardContent';

const CatalogueCard = ({ event, onDeleteClick, onEventCardClick }) => {
  const [cardHeight, setCardHeight] = useState(null);
  const [onDelete, toggleOnDelete] = useState(false);

  const onIntermediateDeleteClick = () => toggleOnDelete(true);

  return (
    <div
      id='event-card'
      className={`card mb-3 ${onDelete && 'fade-out'}`}
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
            page='catalogue'
            onDeleteClick={onDeleteClick}
            setCardHeight={setCardHeight}
            onIntermediateDeleteClick={onIntermediateDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

CatalogueCard.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

export default CatalogueCard;
