import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { toggleFeaturedStatus } from '../../actions/event';

const AdminCardButtons = ({ featured, eventId, toggleFeaturedStatus }) => {
  return (
    <div>
      <Link className='btn btn-danger mb-1' to={`/details/${eventId}`}>
        READ MORE
      </Link>
      <div className='d-none d-md-block float-right'>
        <button
          className={`btn btn-${featured ? 'danger' : 'secondary'}`}
          onClick={() => toggleFeaturedStatus(eventId)}
        >
          <i
            className={`fas ${featured ? 'fa-minus-circle' : 'fa-plus-circle'}`}
          />{' '}
          {featured ? 'Remove from featured' : 'Add to featured'}
        </button>
      </div>
      <div className='d-block d-md-none d-flex'>
        <button
          className={`btn btn-${featured ? 'danger' : 'secondary'}`}
          onClick={() => toggleFeaturedStatus(eventId)}
        >
          <i
            className={`fas ${featured ? 'fa-minus-circle' : 'fa-plus-circle'}`}
          />{' '}
          {featured ? 'Remove from featured' : 'Add to featured'}
        </button>
      </div>
    </div>
  );
};

AdminCardButtons.propTypes = {
  toggleFeaturedStatus: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired,
  featured: PropTypes.bool.isRequired
};

export default connect(
  null,
  { toggleFeaturedStatus }
)(AdminCardButtons);
