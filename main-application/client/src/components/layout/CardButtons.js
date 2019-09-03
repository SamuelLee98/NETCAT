import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { addToCatalogue, deleteFromCatalogue } from '../../actions/catalogue';
import { openModal } from '../../actions/modal';

const CardButtons = ({
  addToCatalogue,
  deleteFromCatalogue,
  openModal,
  isCatalogued,
  eventId,
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
      deleteFromCatalogue(eventId);
      onDeleteClick();
    }, 500);
  };

  // Different styling for different pages
  if (page === 'map')
    return (
      <div className='d-flex justify-content-center'>
        <Link className='btn btn-danger btn-block' to={`/details/${eventId}`}>
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
            openModal(eventId);
          }}
        />
        <i
          id='card-button-icon'
          className='btn fas fa-calendar-alt fa-2x'
          data-toggle='tooltip'
          data-placement='top'
          title='Add to calender'
        />
        {isCatalogued ? (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x'
            data-toggle='tooltip'
            data-placement='top'
            title='Remove from catalogue'
            onClick={() => deleteFromCatalogue(eventId)}
            style={{ color: 'red' }}
          />
        ) : (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x'
            data-toggle='tooltip'
            data-placement='top'
            title='Add to catalogue'
            onClick={() => addToCatalogue(eventId)}
          />
        )}
      </div>
    );

  if (page === 'feature')
    return (
      <Fragment>
        <div>
          <Link className='btn btn-danger' to={`/details/${eventId}`}>
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
                openModal(eventId);
              }}
            />
            <i
              id='card-button-icon'
              className='btn fas fa-calendar-alt px-0 my-1 mx-3 mx-md-1'
              data-toggle='tooltip'
              data-placement='top'
              title='Add to calender'
            />
            {isCatalogued ? (
              <i
                id='card-button-icon'
                className='btn fas fa-heart px-0 my-1'
                data-toggle='tooltip'
                data-placement='top'
                title='Remove from catalogue'
                onClick={() => deleteFromCatalogue(eventId)}
                style={{ color: 'red' }}
              />
            ) : (
              <i
                id='card-button-icon'
                className='btn fas fa-heart px-0 my-1'
                data-toggle='tooltip'
                data-placement='top'
                title='Add to catalogue'
                onClick={() => addToCatalogue(eventId)}
              />
            )}
          </div>
        </div>
      </Fragment>
    );

  if (page === 'catalogue')
    return (
      <div>
        <Link className='btn btn-danger' to={`/details/${eventId}`}>
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
              openModal(eventId);
            }}
          />
          <i
            id='card-button-icon'
            className='btn fas fa-calendar-alt fa-2x px-0 my-1 mx-3'
            data-toggle='tooltip'
            data-placement='top'
            title='Add to calender'
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
      <Link className='btn btn-danger' to={`/details/${eventId}`}>
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
            openModal(eventId);
          }}
        />
        <i
          id='card-button-icon'
          className='btn fas fa-calendar-alt fa-2x px-0 my-1 mx-3'
          data-toggle='tooltip'
          data-placement='top'
          title='Add to calender'
        />
        {isCatalogued ? (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x px-0 my-1'
            data-toggle='tooltip'
            data-placement='top'
            title='Remove from catalogue'
            onClick={() => deleteFromCatalogue(eventId)}
            style={{ color: 'red' }}
          />
        ) : (
          <i
            id='card-button-icon'
            className='btn fas fa-heart fa-2x px-0 my-1'
            data-toggle='tooltip'
            data-placement='top'
            title='Add to catalogue'
            onClick={() => addToCatalogue(eventId)}
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
  eventId: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired
};

export default connect(
  null,
  { addToCatalogue, deleteFromCatalogue, openModal }
)(CardButtons);
