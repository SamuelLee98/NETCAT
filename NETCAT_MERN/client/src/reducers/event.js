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
  error: {}
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
        loading: state.featured.loading || false
      };
    case GET_INDEX_FEATURED_EVENTS:
      return {
        ...state,
        featured: {
          loading: false,
          featured: payload
        },
        loading: state.events.loading || false
      };
    case GET_EVENT:
      return {
        ...state,
        events: {
          ...state.events.events,
          loading: false
        },
        event: payload,
        loading: false
      };
    case GET_FEATURED_EVENT:
      return {
        ...state,
        featured: {
          ...state.featured.featured,
          loading: false
        },
        event: payload,
        loading: false
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
    case EVENT_LOADING:
      return {
        ...state,
        events: {
          ...state.events.events,
          loading: true
        },
        loading: true
      };
    case SET_SCHOOL:
      return {
        ...state,
        school: payload
      };
    case EVENT_ERROR:
      return {
        events: {
          loading: false,
          events: null
        },
        featured: {
          loading: false,
          featured: null
        },
        event: null,
        loading: false,
        school: '',
        error: payload
      };
    default:
      return state;
  }
}
