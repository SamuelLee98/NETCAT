import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertComponent from './AlertComponent';
import { removeAlert } from '../../actions/alert';

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
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { removeAlert }
)(Alerts);
