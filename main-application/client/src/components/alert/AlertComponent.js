import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const AlertComponent = ({ alert, index, removeAlert }) => {
  const alertStyle = {
    position: 'absolute',
    top: index * 25,
    width: '100%'
  };

  return (
    <Alert
      variant={alert.alertType}
      onClose={() => removeAlert(alert.id)}
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
  removeAlert: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default AlertComponent;
