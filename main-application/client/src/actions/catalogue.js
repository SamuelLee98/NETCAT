import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CATALOGUE,
  ADD_EVENT_TO_CATALOGUE,
  CATALOGUE_ERROR,
  CATALOGUE_LOADING,
  DELETE_EVENT_FROM_CATALOGUE
} from './types';

// Get current users catalogue
export const getCurrentCatalogue = () => async dispatch => {
  dispatch({ type: CATALOGUE_LOADING });
  try {
    let res = await axios.get('/api/catalogue/me');
    let events = res.data;

    const eventsPromises = events.map(async event => {
      res = await axios.get(`/api/events/${event.eventId}`);
      return res.data;
    });

    events = await Promise.all(eventsPromises);

    dispatch({
      type: GET_CATALOGUE,
      payload: events
    });
  } catch (err) {
    dispatch({
      type: CATALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add event to catalogue
export const addEventToCatalogue = id => async dispatch => {
  try {
    const res = await axios.post(`/api/catalogue/${id}`);

    dispatch({
      type: ADD_EVENT_TO_CATALOGUE,
      payload: res.data
    });

    dispatch(setAlert('Event added to catalogue successfully', 'success'));
  } catch (err) {
    if (err.response.data) {
      if (err.response.status === 401) {
        dispatch(
          setAlert(
            'Please register or login to add events to catalogue',
            'warning'
          )
        );
      } else {
        dispatch(setAlert(err.response.data.msg, 'warning'));
      }
    }

    dispatch({
      type: CATALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete event from catalogue
export const deleteEventFromCatalogue = id => async dispatch => {
  try {
    await axios.delete(`/api/catalogue/${id}`);

    dispatch({
      type: DELETE_EVENT_FROM_CATALOGUE,
      payload: id
    });

    dispatch(setAlert('Event Removed', 'success'));
  } catch (err) {
    if (err.response.data) {
      dispatch(setAlert(err.response.data.msg, 'warning'));
    }

    dispatch({
      type: CATALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
