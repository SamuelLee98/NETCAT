import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const AlertComponent = ({ alert, index, removeAlert }) => {
  const alertStyle = {
    position: 'absolute',
    top: index * 25,
    width: '100%'
  };

  const [onRemove, toggleOnRemove] = useState(false);

  // Alert automatically fade out after 4 seconds
  useEffect(() => {
    // Set onRemove to true after 4 seconds
    const timer = setTimeout(() => {
      toggleOnRemove(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // If alert is removed before 4s has passed after alert is activated, then
  // Manually fade-out and remove alert
  const onRemoveAlertClick = id => {
    if (onRemove !== true) {
      toggleOnRemove(true);
      setTimeout(() => {
        removeAlert(id);
      }, 1000);
    }
  };

  return (
    <Alert
      id='alert'
      className={onRemove ? 'fade-out' : 'fade-in'}
      variant={alert.alertType}
      onClose={() => onRemoveAlertClick(alert.id)}
      dismissible
      style={alertStyle}
    >
      <p className='text-center mb-0'>
        <span className='font-weight-bold text-uppercase'>
          {alert.alertType}:{' '}
        </span>
        {alert.msg}
      </p>
    </Alert>
  );
};

AlertComponent.propTypes = {
  alert: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  removeAlert: PropTypes.func.isRequired
};

export default AlertComponent;
