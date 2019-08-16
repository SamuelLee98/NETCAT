import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CATALOGUE_EVENTS,
  GET_CATALOGUE_IDS,
  ADD_TO_CATALOGUE,
  CATALOGUE_ERROR,
  CATALOGUE_EVENTS_LOADING,
  CATALOGUE_IDS_LOADING,
  DELETE_FROM_CATALOGUE,
  CLEAR_CATALOGUE
} from './types';

// Get a set range of catalogue events
export const getCatalogueEvents = (
  offset,
  limit,
  initialLoad = false
) => async dispatch => {
  try {
    if (initialLoad) dispatch({ type: CATALOGUE_EVENTS_LOADING });
    let res = await axios.get('/api/catalogue/me');

    let eventsPromises = res.data
      .slice(offset, offset + limit)
      .map(async event => {
        let res2 = await axios.get(`/api/events/${event.eventId}`);
        return res2.data;
      });

    let events = await Promise.all(eventsPromises);

    let hasMore = true;
    if (offset + limit >= res.data.length) hasMore = false;

    dispatch({
      type: GET_CATALOGUE_EVENTS,
      payload: { events, hasMore }
    });
    console.log(`${offset}, ${offset + limit} getCatalogue action done`);
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

// Clear catalogue on clean up
export const clearCatalogue = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CATALOGUE
    });
  } catch (err) {
    dispatch({
      type: CATALOGUE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
