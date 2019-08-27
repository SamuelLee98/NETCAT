import React from 'react';
import CardContent from '../layout/CardContent';

const MoreEvent = ({ event }) => {
  return (
    <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3'>
      <div className='card'>
        <CardContent event={event} page='content' />
      </div>
    </div>
  );
};

export default MoreEvent;
