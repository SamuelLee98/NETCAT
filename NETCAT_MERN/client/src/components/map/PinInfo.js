import React from 'react';
import Moment from 'react-moment';

const PinInfo = ({
  event: {
    title,
    date: { multiDay, from, to },
    location: { room, address }
  }
}) => {
  return (
    <div className='card mx-2' style={{ padding: '0px', border: 'none' }}>
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
  );
};

export default PinInfo;
