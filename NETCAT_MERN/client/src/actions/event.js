import axios from 'axios';
import {
  GET_INDEX_EVENTS,
  GET_INDEX_FEATURED_EVENTS,
  GET_EVENT,
  GET_FEATURED_EVENT,
  EVENT_ERROR,
  EVENT_LOADING,
  FEATURED_LOADING,
  SET_SCHOOL
} from '../actions/types';
import loading from './loading';

// Set school
export const setSchool = (school = '') => dispatch => {
  dispatch({
    type: SET_SCHOOL,
    payload: school
  });
};

// Get normal events on index page
export const getIndexEvents = (school = '') => async dispatch => {
  try {
    // Set loading
    dispatch(loading(EVENT_LOADING));
    const res = await axios.get(`/api/events?school=${school}&limit=6`);

    dispatch({
      type: GET_INDEX_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get FEATURED events on index page
export const getIndexFeaturedEvents = (school = '') => async dispatch => {
  try {
    // Set loading
    dispatch(loading(FEATURED_LOADING));
    const res = await axios.get(
      `/api/events?school=${school}&limit=4&featured=true`
    );

    dispatch({
      type: GET_INDEX_FEATURED_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get NORMAL event by id
export const getEvent = id => async dispatch => {
  try {
    // Set loading
    dispatch(loading(EVENT_LOADING));
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get FEATURED event by id
export const getFeaturedEvent = id => async dispatch => {
  try {
    // Set loading
    dispatch(loading(FEATURED_LOADING));
    const res = await axios.get(`/api/events/${id}?featured=true`);

    dispatch({
      type: GET_FEATURED_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
