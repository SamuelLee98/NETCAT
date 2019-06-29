import {
  GET_INDEX_EVENTS,
  GET_INDEX_FEATURED_EVENTS,
  GET_EVENT,
  GET_FEATURED_EVENT,
  EVENT_ERROR,
  EVENT_LOADING,
  FEATURED_LOADING,
  SET_SCHOOL
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
  school: '',
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
    case GET_EVENT:
    case GET_FEATURED_EVENT:
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
    case SET_SCHOOL:
      return {
        ...state,
        school: payload
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
