import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import AddToCalendar from 'react-add-to-calendar';
import { openModal } from '../../actions/modal';
import { deleteFromCatalogueEvents } from '../../actions/catalogue';
import facebook from '../content/images/facebook.png';

const Catalogue = ({ event, openModal, deleteFromCatalogueEvents }) => {
  return (
    <div className='card mb-3'>
      <div className='row no-gutters'>
        <div className='col-3'>
          <img src={facebook} className='card-img' alt='Responsive Thumbnail' />
        </div>
        <div className='col-6'>
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
          </div>
        </div>
        <div className='col-3 p-2'>
          <div className='float-right'>
            <i
              className='fa fa-close fa-2x'
              style={{
                color: 'red',
                textShadow: '1px 1px 0px black',
                cursor: 'pointer'
              }}
              onClick={() => deleteFromCatalogueEvents(event._id)}
            />
          </div>
          <br />
          <br />
          <div className='mx-2'>
            <Link
              to={`/details/${event._id}`}
              className='btn btn-danger btn-block my-1'
            >
              Read more!
            </Link>
            <button
              onClick={() => {
                openModal(event._id);
              }}
              className='btn btn-danger btn-block my-1'
            >
              Share
            </button>

            <button
              className='btn btn-danger btn-block my-1'
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

Catalogue.propTypes = {
  openModal: PropTypes.func.isRequired,
  deleteFromCatalogueEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

export default connect(
  null,
  { openModal, deleteFromCatalogueEvents }
)(Catalogue);
