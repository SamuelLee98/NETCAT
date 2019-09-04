import axios from 'axios';
import {
  GET_FEATURED_EVENTS,
  GET_DETAILS_EVENT,
  GET_EXPLORE_EVENTS,
  EVENT_ERROR,
  FEATURED_LOADING,
  EXPLORE_LOADING,
  DETAILS_LOADING,
  UPDATE_FEATURED,
  CLEAR_EVENTS,
  SET_PAGE
} from '../actions/types';
import loading from './loading';
import { setAlert } from './alert';

// Set page
export const setPage = (page = '') => dispatch => {
  dispatch({
    type: SET_PAGE,
    payload: page
  });
};

// Get FEATURED events on index page
export const getFeaturedEvents = (school = '') => async dispatch => {
  try {
    // Set loading
    dispatch(loading(FEATURED_LOADING));
    const res = await axios.get(
      `/api/events/index?school=${school}&featured=true`
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

// Update event featured status
export const toggleFeaturedStatus = id => async dispatch => {
  try {
    await axios.put(`/api/events/feature/${id}`);

    dispatch({
      type: UPDATE_FEATURED,
      payload: id
    });

    dispatch(setAlert('Featured status toggled', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
