import { combineReducers } from 'redux';
import event from './event';
import modal from './modal';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import catalogue from './catalogue';

export default combineReducers({
  event,
  modal,
  alert,
  auth,
  profile,
  catalogue
});
