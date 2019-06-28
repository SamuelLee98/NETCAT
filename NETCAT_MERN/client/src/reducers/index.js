import { combineReducers } from 'redux';
import event from './event';
import displayModal from './modal';

export default combineReducers({
  event,
  displayModal
});
