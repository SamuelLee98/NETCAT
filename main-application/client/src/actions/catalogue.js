import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CATALOGUE_EVENTS,
  GET_CATALOGUE_IDS,
  ADD_TO_CATALOGUE,
  CATALOGUE_ERROR,
  CATALOGUE_LOADING,
  DELETE_FROM_CATALOGUE_EVENTS,
  DELETE_FROM_CATALOGUE_IDS
} from './types';

// Get current users catalogue events
export const getCatalogueEvents = () => async dispatch => {
  dispatch({ type: CATALOGUE_LOADING });
  try {
    let res = await axios.get('/api/catalogue/me');

    let eventsPromises = res.data.map(async event => {
      res = await axios.get(`/api/events/${event.eventId}`);
      return res.data;
    });

    let events = await Promise.all(eventsPromises);

    dispatch({
      type: GET_CATALOGUE_EVENTS,
      payload: events
    });
  } catch (err) {
    dispatch({
      type: CATALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get list of ids of events added to catalogue
export const getCatalogueEventIds = () => async dispatch => {
  dispatch({ type: CATALOGUE_LOADING });
  try {
    let res = await axios.get('/api/catalogue/me');
    const eventIds = res.data.map(event => event.eventId);

    dispatch({
      type: GET_CATALOGUE_IDS,
      payload: eventIds
    });
  } catch (err) {
    dispatch({
      type: CATALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add event to catalogue
export const addToCatalogue = id => async dispatch => {
  try {
    await axios.post(`/api/catalogue/${id}`);

    dispatch({
      type: ADD_TO_CATALOGUE,
      payload: id
    });

    dispatch(setAlert('Event added to your catalogue', 'success'));
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

// Delete event from catalogue and remove the event from EVENTS array
export const deleteFromCatalogueEvents = id => async dispatch => {
  try {
    await axios.delete(`/api/catalogue/${id}`);
    dispatch({
      type: DELETE_FROM_CATALOGUE_EVENTS,
      payload: id
    });

    dispatch(setAlert('Event removed from your catalogue', 'success'));
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

// Delete event from catalogue and remove the event from IDS array
export const deleteFromCatalogueIds = id => async dispatch => {
  try {
    await axios.delete(`/api/catalogue/${id}`);

    dispatch({
      type: DELETE_FROM_CATALOGUE_IDS,
      payload: id
    });

    dispatch(setAlert('Event removed from your catalogue', 'success'));
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
