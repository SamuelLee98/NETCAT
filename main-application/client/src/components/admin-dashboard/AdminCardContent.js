import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import AdminCardButtons from './AdminCardButtons';

const AdminCardContent = ({ event, setCardHeight }) => {
  useEffect(() => {
    if (setCardHeight != null) {
      setCardHeight(document.getElementById('card-body').clientHeight);
    }
  }, []);

  let MomentComponent;
  if (event.date.multiDay && event.date.allDay) {
    MomentComponent = (
      <div>
        <i className='fas fa-clock' /> All day
        <br />
        <i className='fas fa-calendar-alt' />{' '}
        <Moment format='ddd, MMM D' tz='UTC'>
          {event.date.from}
        </Moment>{' '}
        -{' '}
        <Moment format='ddd, MMM D' tz='UTC'>
          {event.date.to}
        </Moment>
      </div>
    );
  } else if (event.date.allDay) {
    MomentComponent = (
      <div>
        <i className='fas fa-clock' /> All day
        <br />
        <i className='fas fa-calendar-alt' />{' '}
        <Moment format='ddd, MMM D' tz='UTC'>
          {event.date.from}
        </Moment>
      </div>
    );
  } else {
    MomentComponent = (
      <div>
        <i className='fas fa-clock' />{' '}
        <Moment format='hh:mm A' tz='UTC'>
          {event.date.from}
        </Moment>{' '}
        -{` `}
        <Moment format='hh:mm A' tz='UTC'>
          {event.date.to}
        </Moment>
        <br />
        <i className='fas fa-calendar-alt' />{' '}
        <Moment format='ddd, MMM D' tz='UTC'>
          {event.date.from}
        </Moment>
      </div>
    );
  }
  return (
    <div id='card-body' className='card-body'>
      <h5 className='card-title'>{event.title}</h5>
      {MomentComponent}
      {event.location.room && (
        <Fragment>
          <i className='fas fa-map-marker-alt' /> {event.location.room}
          <br />
        </Fragment>
      )}
      <span className='text-capitalize'>
        <i className='fas fa-graduation-cap' />
        {event.school}
      </span>
      <br />
      Tags:{' '}
      {event.tags.map((tag, index) => (
        <span key={index} className='badge badge-pill badge-secondary mx-1'>
          {tag}
        </span>
      ))}
      <br />
      <br />
      <AdminCardButtons featured={event.featured} eventId={event._id} />
    </div>
  );
};

export default AdminCardContent;
