import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CATALOGUE_EVENTS,
  GET_CATALOGUE_IDS,
  ADD_TO_CATALOGUE,
  PUSH_TO_CATALOGUE,
  CATALOGUE_ERROR,
  CATALOGUE_EVENTS_LOADING,
  CATALOGUE_IDS_LOADING,
  DELETE_FROM_CATALOGUE
} from './types';

// Get certain number of catalogue events
export const getCatalogueEvents = (offset, limit) => async dispatch => {
  dispatch({ type: CATALOGUE_EVENTS_LOADING });
  try {
    let res = await axios.get('/api/catalogue/me');

    let eventsPromises = res.data
      .slice(offset, offset + limit)
      .map(async event => {
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

// Push next event to current events array
export const pushToCatalogue = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);
    console.log(res.data);
    dispatch({
      type: PUSH_TO_CATALOGUE,
      payload: res.data
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
  dispatch({ type: CATALOGUE_IDS_LOADING });
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

// Delete event from catalogue
export const deleteFromCatalogue = id => async dispatch => {
  try {
    await axios.delete(`/api/catalogue/${id}`);
    dispatch({
      type: DELETE_FROM_CATALOGUE,
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
