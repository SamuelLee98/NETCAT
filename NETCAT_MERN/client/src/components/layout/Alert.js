import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
<<<<<<< HEAD
    <div
      key={alert.id}
      className={`alert alert-${alert.alertType} text-center`}
    >
=======
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
>>>>>>> f77a29417e1100df103e7382a6b40698f5f06dcf
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
