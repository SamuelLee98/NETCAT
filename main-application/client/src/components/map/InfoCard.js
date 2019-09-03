import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '../layout/CardContent';

const InfoCard = ({ event }) => {
  return (
    <div className='card info-card mb-3 mx-2'>
      <CardContent event={event} page='map' />
    </div>
  );
};

InfoCard.propTypes = {
  event: PropTypes.object.isRequired
};

export default InfoCard;
