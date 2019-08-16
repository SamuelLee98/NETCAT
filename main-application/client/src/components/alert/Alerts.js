import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';
import AlertComponent from './AlertComponent';

const Alerts = ({ alerts, removeAlert }) => {
  return (
    <div className='fixed-top'>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert, index) => (
          <AlertComponent
            key={alert.id}
            alert={alert}
            index={index}
            removeAlert={removeAlert}
          />
        ))}
    </div>
  );
};

Alerts.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { removeAlert }
)(Alerts);
