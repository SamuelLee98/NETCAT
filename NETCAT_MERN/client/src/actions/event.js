import axios from 'axios';
import {
  GET_EVENTS,
  GET_FEATURED,
  EVENT_ERROR,
  EVENTS_LOADING,
  FEATURED_LOADING
} from '../actions/types';
import loading from './loading';

// Get normal events
export const getEvents = () => async dispatch => {
  try {
    // Set loading
    dispatch(loading(EVENTS_LOADING));
    const res = await axios.get('/api/events?school=viterbi');

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get FEATURED events
export const getFeaturedEvents = () => async dispatch => {
  try {
    // Set loading
    dispatch(loading(FEATURED_LOADING));
    const res = await axios.get('/api/events/featured?school=viterbi');

    dispatch({
      type: GET_FEATURED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
