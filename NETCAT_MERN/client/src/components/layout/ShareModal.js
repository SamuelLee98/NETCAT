import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions/modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShareModal = ({ onDisplay, url, closeModal }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  window.onclick = event => {
    let modal = document.getElementById('myModal');
    if (event.target === modal) {
      onCloseClick();
    }
  };

  const onCloseClick = () => {
    closeModal();
    setCopySuccess(false);
  };

  return (
    <div
      id='myModal'
      className='modal'
      style={onDisplay ? { display: 'block' } : { display: 'none' }}
    >
      <div className='modal-content'>
        <div className='container'>
          <span className='close' onClick={() => onCloseClick()}>
            &times;
          </span>
          <h4>Share this event</h4>

          <div className='input-group'>
            <input
              type='text'
              readOnly
              className={`form-control form-control-plaintext ${copySuccess &&
                'is-valid'}`}
              id='url'
              value={url}
              style={{ borderWidth: '1px' }}
            />
            <div className='input-group-btn'>
              <CopyToClipboard text={url} onCopy={() => setCopySuccess(true)}>
                <button
                  className='btn btn-default'
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                  }}
                >
                  <i className='fas fa-copy' />
                </button>
              </CopyToClipboard>
            </div>
          </div>
          {copySuccess && (
            <small className='text-success'>Copied to clipboard!</small>
          )}
        </div>
      </div>
    </div>
  );
};

ShareModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onDisplay: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  onDisplay: state.modal.onDisplay,
  url: state.modal.url
});

export default connect(
  mapStateToProps,
  { closeModal }
)(ShareModal);
