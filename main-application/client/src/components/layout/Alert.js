import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => (
  <div className='fixed-top'>
    {alerts !== null &&
      alerts.length > 0 &&
      alerts.map(alert => (
        <div
          key={alert.id}
          // Only the last alert sticks on top
          className={`alert alert-${alert.alertType} text-center`}
        >
          {alert.msg}
        </div>
      ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
