import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '../layout/CardContent';

const Catalogue = ({ event, onDeleteClick }) => {
  return (
    <div className='card mb-3'>
      <div className='row'>
        <div className='col-12 col-md-4'>
          <img
            src={event.thumbnailUrl}
            className='card-img'
            alt='Responsive Thumbnail'
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className='col-12 col-md-8'>
          <CardContent
            event={event}
            page='catalogue'
            onDeleteClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

Catalogue.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

export default Catalogue;
