import React from 'react';
import Moment from 'react-moment';
import CardButtons from '../layout/CardButtons';

const MoreEvent = ({ event }) => {
  return (
    <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3'>
      <div className='card'>
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
            eventId={event._id}
            isCatalogued={event.isCatalogued}
            page='content'
          />
        </div>
      </div>
    </div>
  );
};

export default MoreEvent;
