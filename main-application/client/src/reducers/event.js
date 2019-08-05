import {
  GET_INDEX_EVENTS,
  GET_INDEX_FEATURED_EVENTS,
  GET_MORE_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  EVENT_LOADING,
  FEATURED_LOADING,
  SET_PAGE
} from '../actions/types';

const initialState = {
  events: {
    loading: true,
    events: []
  },
  featured: {
    loading: true,
    featured: []
  },
  event: null,
  loading: true,
  page: '',
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_INDEX_EVENTS:
      return {
        ...state,
        events: {
          loading: false,
          events: payload
        },
        loading: state.featured.loading || false,
        error: null
      };
    case GET_INDEX_FEATURED_EVENTS:
      return {
        ...state,
        featured: {
          loading: false,
          featured: payload
        },
        loading: state.events.loading || false,
        error: null
      };
    case GET_MORE_EVENTS:
      return {
        ...state,
        events: {
          loading: false,
          events: payload
        },
        loading: false,
        error: null
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
        error: null
      };
    case FEATURED_LOADING:
      return {
        ...state,
        featured: {
          ...state.featured,
          loading: true
        },
        loading: true
      };
    case EVENT_LOADING:
      return {
        ...state,
        events: {
          ...state.events,
          loading: true
        },
        loading: true,
        error: null
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case EVENT_ERROR:
      return {
        ...state,
        events: {
          ...state.events,
          loading: false
        },
        featured: {
          ...state.featured,
          loading: false
        },
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
