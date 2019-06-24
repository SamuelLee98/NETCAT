import {
  GET_EVENTS,
  GET_FEATURED,
  EVENT_ERROR,
  EVENTS_LOADING,
  FEATURED_LOADING
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
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: {
          loading: false,
          events: payload
        },
        loading: state.featured.loading || false
      };
    case GET_FEATURED:
      return {
        ...state,
        featured: {
          loading: false,
          featured: payload
        },
        loading: state.events.loading || false
      };
    case FEATURED_LOADING:
      return {
        ...state,
        featured: {
          ...state.featured.featured,
          loading: true
        },
        loading: true
      };
    case EVENTS_LOADING:
      return {
        ...state,
        events: {
          ...state.events.events,
          loading: true
        },
        loading: true
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
