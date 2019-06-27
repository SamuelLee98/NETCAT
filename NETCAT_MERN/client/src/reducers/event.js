import {
  GET_INDEX_EVENTS,
  GET_INDEX_FEATURED,
  EVENT_ERROR,
  EVENTS_LOADING,
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
    case GET_INDEX_FEATURED:
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
    case SET_SCHOOL:
      return {
        ...state,
        school: payload
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
