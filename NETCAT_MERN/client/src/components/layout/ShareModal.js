import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleModalDisplay } from '../../actions/modal';

const ShareModal = ({ displayModal, toggleModalDisplay }) => {
  return (
    <div
      id='myModal'
      className='modal'
      style={displayModal ? { display: 'block' } : null}
    >
      <div className='modal-content'>
        <div className='container'>
          <span className='close' onClick={() => toggleModalDisplay()}>
            &times;
          </span>
          Share this event
        </div>
      </div>
    </div>
  );
};

ShareModal.propTypes = {
  toggleModalDisplay: PropTypes.func.isRequired,
  displayModal: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  displayModal: state.displayModal
});

export default connect(
  mapStateToProps,
  { toggleModalDisplay }
)(ShareModal);
