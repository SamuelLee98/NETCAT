import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions/modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from 'react-share';
import MessengerIcon from './messenger.svg';

// Message to be shared
const shareMessage = 'Check out this event on NETCAT!';

const ShareModal = ({ onDisplay, url, closeModal }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Handle closing modal when clicked anywhere on screen other than itself
  window.onclick = event => {
    let modal = document.getElementById('myModal');
    if (event.target === modal) {
      onCloseClick();
    }
  };

  // Handle closing modal when clicked on the close button
  const onCloseClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      closeModal();
      setFadeOut(false);
      setCopySuccess(false);
    }, 500);
  };

  // Handle sharing on messenger
  const onMessengerShare = () => {
    console.log(url);
    window.FB.ui({
      method: 'send',
      /**
       * @todo
       * FIX THIS URL WHEN DEPLOYING
       *
       * May need to implement this for mobile users
       * https://developers.facebook.com/docs/sharing/messenger/web
       */
      link: 'http://google.com'
    });
  };

  return (
    <div
      id='myModal'
      className={`modal ${fadeOut ? 'fade-out' : 'fade-in'}`}
      style={onDisplay ? { display: 'block' } : { display: 'none' }}
    >
      <div className='container'>
        <div className='modal-content'>
          <h4 className='text-center my-0'>
            Share this event{' '}
            <span className='close-modal' onClick={() => onCloseClick()}>
              &times;
            </span>
          </h4>

          <div className='d-flex justify-content-center my-2'>
            <div className='icon-wrapper'>
              <FacebookShareButton
                className='react-share-button'
                url={url}
                quote={shareMessage}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className='icon-wrapper'>
              <img
                src={MessengerIcon}
                className='react-share-button custom-icon'
                alt='Messenger'
                onClick={() => onMessengerShare()}
              />
            </div>

            <div className='icon-wrapper'>
              <TwitterShareButton
                url={url}
                title={shareMessage}
                className='react-share-button'
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <div className='icon-wrapper'>
              <EmailShareButton
                url={url}
                subject={shareMessage}
                className='react-share-button'
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </div>

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
                  <i className='fa fa-copy' />
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
