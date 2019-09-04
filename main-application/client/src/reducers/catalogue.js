import {
  GET_CATALOGUE_EVENTS,
  GET_CATALOGUE_IDS,
  ADD_TO_CATALOGUE,
  CATALOGUE_ERROR,
  CLEAR_CATALOGUE,
  CATALOGUE_EVENTS_LOADING,
  CATALOGUE_IDS_LOADING,
  DELETE_FROM_CATALOGUE
} from '../actions/types';

const initialState = {
  events: null,
  ids: null,
  eventsLoading: true,
  idsLoading: true,
  hasMore: true,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATALOGUE_EVENTS:
      let newEventsState;
      if (state.events !== null) {
        let idsArr = state.events.map(event => event._id);
        newEventsState = state.events;
        payload.events.forEach(event => {
          if (idsArr.includes(event._id) === false) {
            newEventsState.push(event);
          }
        });
      } else {
        newEventsState = payload.events;
      }

      return {
        ...state,
        events: newEventsState,
        hasMore: payload.hasMore,
        eventsLoading: false,
        error: null
      };
    case GET_CATALOGUE_IDS:
      return {
        ...state,
        ids: payload,
        idsLoading: false,
        error: null
      };
    case CATALOGUE_EVENTS_LOADING:
      return {
        ...state,
        eventsLoading: true,
        error: null
      };
    case CATALOGUE_IDS_LOADING:
      return {
        ...state,
        idsLoading: true,
        error: null
      };
    case ADD_TO_CATALOGUE:
      return {
        ...state,
        ids: [...state.ids, payload]
      };
    case DELETE_FROM_CATALOGUE:
      return {
        ...state,
        ids: state.ids !== null ? state.ids.filter(id => id !== payload) : null,
        events:
          state.events !== null
            ? state.events.filter(event => event._id !== payload)
            : null
      };
    case CLEAR_CATALOGUE:
      return {
        ids: null,
        events: null,
        eventsLoading: true,
        idsLoading: true,
        hasMore: true,
        error: null
      };
    case CATALOGUE_ERROR:
      return {
        ...state,
        error: payload,
        eventsLoading: false,
        idsLoading: false
      };
    default:
      return state;
  }
}
