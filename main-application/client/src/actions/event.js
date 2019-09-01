import axios from 'axios';
import {
  GET_MORE_EVENTS,
  GET_FEATURED_EVENTS,
  GET_DETAILS_EVENT,
  GET_EXPLORE_EVENTS,
  EVENT_ERROR,
  MORE_LOADING,
  FEATURED_LOADING,
  EXPLORE_LOADING,
  DETAILS_LOADING,
  CLEAR_EVENTS,
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

// Get more events on index page
export const getMoreEvents = (school = '') => async dispatch => {
  try {
    // Set loading
    dispatch(loading(MORE_LOADING));
    const res = await axios.get(
      `/api/events/index?school=${school}&limit=6&featured=false`
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

// Get FEATURED events on index page
export const getFeaturedEvents = (school = '') => async dispatch => {
  try {
    // Set loading
    dispatch(loading(FEATURED_LOADING));
    const res = await axios.get(
      `/api/events/index?school=${school}&limit=4&featured=true`
    );

    dispatch({
      type: GET_FEATURED_EVENTS,
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
    dispatch(loading(DETAILS_LOADING));
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_DETAILS_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get explore events
export const getExploreEvents = (
  school = '',
  featured = '',
  tags = ''
) => async dispatch => {
  try {
    dispatch(loading(EXPLORE_LOADING));
    const res = await axios.get(
      `/api/events?school=${school}&tags=${tags}&featured=${featured}`
    );

    dispatch({
      type: GET_EXPLORE_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Clear all events on cleanup
export const clearEvents = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_EVENTS
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
