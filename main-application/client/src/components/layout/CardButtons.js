import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
// Actions
import { addToCatalogue, deleteFromCatalogue } from '../../actions/catalogue';
import { openModal } from '../../actions/modal';

const CardButtons = ({
  addToCatalogue,
  deleteFromCatalogue,
  openModal,
  isCatalogued,
  event,
  onDeleteClick,
  onIntermediateDeleteClick,
  page
}) => {
  // Function used in dashboard page
  const handleDashboardDeleteClick = () => {
    // Trigger fade-out
    onIntermediateDeleteClick();
    // Remove event after .5s
    setTimeout(() => {
      deleteFromCatalogue(event._id);
      onDeleteClick();
    }, 500);
  };

  // Date string used for google calendar
  const buildGoogleCalendarString = () => {
    let dateFrom, dateTo, location;

    // Format date
    if (event.date.allDay) {
      dateFrom = event.date.from.replace(/-|:|\.\d\d\d/g, '').slice(0, 8);
      let toDateObj = new Date(event.date.to);
      dateTo = toDateObj
        .toISOString()
        .replace(/-|:|\.\d\d\d/g, '')
        .slice(0, 8);
    } else {
      dateFrom = event.date.from.replace(/-|:|\.\d\d\d/g, '').slice(0, -1);
      dateTo = event.date.to.replace(/-|:|\.\d\d\d/g, '').slice(0, -1);
    }

    // Format location
    if (event.location.address && event.location.room) {
      location = `&location=${event.location.room +
        ', ' +
        event.location.address}`;
    } else if (event.location.address) {
      location = `&location=${event.location.address}`;
    } else {
      location = '';
    }

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${event.title}&dates=${dateFrom}/${dateTo}${location}&sf=true&output=xml`;
  };

  // Different styling for different pages
  if (page === 'map')
    return (
      <div className='d-flex justify-content-center'>
        <Link className='btn btn-danger btn-block' to={`/details/${event._id}`}>
          READ MORE
        </Link>
      </div>
    );

  if (page === 'details')
    return (
      <div>
        <i
          id='card-button-icon'
          className='btn fas fa-share-alt fa-2x'
          data-toggle='tooltip'
          data-placement='top'
          title='Share this post'
          onClick={() => {
            openModal(event._id);
          }}
        />
        <i
          id='card-button-icon'
          className='btn fas fa-calendar-alt fa-2x'
          data-toggle='tooltip'
          data-placement='top'
          title='Add to Google Calender'
          onClick={() => window.open(buildGoogleCalendarString(), '_blank')}
        />
        {isCatalogued ? (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x'
            data-toggle='tooltip'
            data-placement='top'
            title='Remove from catalogue'
            onClick={() => deleteFromCatalogue(event._id)}
            style={{ color: 'red' }}
          />
        ) : (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x'
            data-toggle='tooltip'
            data-placement='top'
            title='Add to catalogue'
            onClick={() => addToCatalogue(event._id)}
          />
        )}
      </div>
    );

  if (page === 'feature')
    return (
      <Fragment>
        <div>
          <Link className='btn btn-danger' to={`/details/${event._id}`}>
            READ MORE
          </Link>
          <div className='float-right'>
            <i
              id='card-button-icon'
              className='btn fas fa-share-alt px-0 my-1'
              data-toggle='tooltip'
              data-placement='top'
              title='Share this post'
              onClick={() => {
                openModal(event._id);
              }}
            />
            <i
              id='card-button-icon'
              className='btn fas fa-calendar-alt px-0 my-1 mx-3 mx-md-1'
              data-toggle='tooltip'
              data-placement='top'
              title='Add to Google Calender'
              onClick={() => window.open(buildGoogleCalendarString(), '_blank')}
            />
            <i
              id='card-button-icon'
              className='btn fas fa-heart px-0 my-1'
              data-toggle='tooltip'
              data-placement='top'
              title='Remove from catalogue'
              onClick={() =>
                isCatalogued
                  ? deleteFromCatalogue(event._id)
                  : addToCatalogue(event._id)
              }
              style={isCatalogued ? { color: 'red' } : null}
            />
          </div>
        </div>
      </Fragment>
    );

  if (page === 'catalogue')
    return (
      <div>
        <Link className='btn btn-danger' to={`/details/${event._id}`}>
          READ MORE
        </Link>
        <div className='float-right'>
          <i
            id='card-button-icon'
            className='btn fas fa-share-alt fa-2x px-0 my-1'
            data-toggle='tooltip'
            data-placement='top'
            title='Share this post'
            onClick={() => {
              openModal(event._id);
            }}
          />
          <i
            id='card-button-icon'
            className='btn fas fa-calendar-alt fa-2x px-0 my-1 mx-3'
            data-toggle='tooltip'
            data-placement='top'
            title='Add to Google Calender'
            onClick={() => window.open(buildGoogleCalendarString(), '_blank')}
          />
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x px-0 my-1'
            data-toggle='tooltip'
            data-placement='top'
            title='Remove from catalogue'
            onClick={() => handleDashboardDeleteClick()}
            style={{ color: 'red' }}
          />
        </div>
      </div>
    );

  return (
    <div>
      <Link className='btn btn-danger' to={`/details/${event._id}`}>
        READ MORE
      </Link>
      <div className='float-right'>
        <i
          id='card-button-icon'
          className='btn fas fa-share-alt fa-2x px-0 my-1'
          data-toggle='tooltip'
          data-placement='top'
          title='Share this post'
          onClick={() => {
            openModal(event._id);
          }}
        />
        <i
          id='card-button-icon'
          className='btn fas fa-calendar-alt fa-2x px-0 my-1 mx-3'
          data-toggle='tooltip'
          data-placement='top'
          title='Add to Google Calender'
          onClick={() => window.open(buildGoogleCalendarString(), '_blank')}
        />
        {isCatalogued ? (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x px-0 my-1'
            data-toggle='tooltip'
            data-placement='top'
            title='Remove from catalogue'
            onClick={() => deleteFromCatalogue(event._id)}
            style={{ color: 'red' }}
          />
        ) : (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x px-0 my-1'
            data-toggle='tooltip'
            data-placement='top'
            title='Add to catalogue'
            onClick={() => addToCatalogue(event._id)}
          />
        )}
      </div>
    </div>
  );
};

CardButtons.propTypes = {
  addToCatalogue: PropTypes.func.isRequired,
  deleteFromCatalogue: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired
};

export default connect(
  null,
  { addToCatalogue, deleteFromCatalogue, openModal }
)(CardButtons);
