import { combineReducers } from 'redux';
import event from './event';
import modal from './modal';
import alert from './alert';

export default combineReducers({
  event,
  modal,
  alert
});
