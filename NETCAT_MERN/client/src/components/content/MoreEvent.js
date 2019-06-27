import React from 'react';
import Moment from 'react-moment';

const MoreEvent = ({
  event: {
    title,
    date: { multiDay, from, to },
    location: { room, address }
  }
}) => {
  return (
    <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <Moment format='hh:mm A'>{from}</Moment> -{` `}
          <Moment format='hh:mm A'>{to}</Moment>
          <br />
          <Moment format='dddd, MMMM D, YYYY'>{from}</Moment>
          <br />
          {room}
          <br />
          <br />
          <a href='details.html' className='btn btn-danger'>
            Check it out!
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoreEvent;
