import axios from 'axios';
import {
  GET_INDEX_EVENTS,
  GET_INDEX_FEATURED_EVENTS,
  GET_EVENT,
  GET_MORE_EVENTS,
  EVENT_ERROR,
  EVENT_LOADING,
  FEATURED_LOADING,
  SET_PAGE
} from '../actions/types';
import loading from './loading';

// Set page
export const setPage = (page = '') => dispatch => {
  dispatch({
    type: SET_PAGE,
    payload: page
  });
};

// Get normal events on index page
export const getIndexEvents = (school = '') => async dispatch => {
  try {
    // Set loading
    dispatch(loading(EVENT_LOADING));
    const res = await axios.get(
      `/api/events/index?school=${school}&limit=6&featured=false`
    );

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
      `/api/events/index?school=${school}&limit=4&featured=true`
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

// Get event by id
export const getEventById = id => async dispatch => {
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

// Get event by for details page
export const getMoreEvents = (
  school = '',
  type = '',
  featured = ''
) => async dispatch => {
  try {
    // Set loading
    dispatch(loading(EVENT_LOADING));
    const res = await axios.get(
      `/api/events?school=${school}&type=${type}&featured=${featured}`
    );

    dispatch({
      type: GET_MORE_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
