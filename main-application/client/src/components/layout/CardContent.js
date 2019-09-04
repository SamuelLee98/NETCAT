import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import EllipsisText from 'react-ellipsis-text';
import CardButtons from './CardButtons';

const CardContent = ({
  event,
  page,
  onDeleteClick,
  onIntermediateDeleteClick,
  setCardHeight
}) => {
  let MomentComponent;

  useEffect(() => {
    if (setCardHeight != null) {
      setCardHeight(document.getElementById('card-body').clientHeight);
    }
  }, [setCardHeight]);

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
      <div className='text-capitalize'>
        <i className='fas fa-graduation-cap' />
        {event.school}
      </div>
      {page === 'feature' && (
        <Fragment>
          <EllipsisText text={event.description} length={300} />
        </Fragment>
      )}
      {page === 'details' && (
        <Fragment>
          <p>{event.description}</p>
        </Fragment>
      )}
      <br />
      <br />
      Tags:{' '}
      {event.tags.map((tag, index) => (
        <span key={index} className='badge badge-pill badge-secondary mx-1'>
          {tag}
        </span>
      ))}
      <br />
      <br />
      <CardButtons
        isCatalogued={event.isCatalogued}
        event={event}
        page={page}
        onDeleteClick={onDeleteClick}
        onIntermediateDeleteClick={onIntermediateDeleteClick}
      />
    </div>
  );
};

export default CardContent;
