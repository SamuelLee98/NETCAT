import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import AddToCalendar from 'react-add-to-calendar';

const MoreEvent = ({ event, openModal }) => {
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
          <div className='row justify-content-center'>
            <Link
              to={`/details/${event._id}`}
              className='btn btn-danger btn-block m-1'
            >
              Read more!
            </Link>
            <div className='w-100' />
            <button
              onClick={() => {
                openModal(event._id);
              }}
              className='btn btn-danger btn-block m-1'
            >
              Share
            </button>
            <div className='w-100' />
            <button
              className='btn btn-danger btn-block m-1'
              style={{
                paddingLeft: '0',
                paddingRight: '0'
              }}
            >
              <AddToCalendar
                event={{
                  title: event.title,
                  description: event.description,
                  location: event.location.address,
                  startTime: event.date.from,
                  endTime: event.date.to
                }}
                buttonTemplate={{ calendar: 'left' }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreEvent;
