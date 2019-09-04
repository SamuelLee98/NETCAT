import {
  GET_FEATURED_EVENTS,
  GET_EXPLORE_EVENTS,
  GET_DETAILS_EVENT,
  EVENT_ERROR,
  EXPLORE_LOADING,
  FEATURED_LOADING,
  DETAILS_LOADING,
  UPDATE_FEATURED,
  SET_PAGE,
  CLEAR_EVENTS
} from '../actions/types';

const initialState = {
  featured: {
    loading: true,
    events: null
  },
  explore: {
    loading: true,
    events: null
  },
  details: {
    loading: true,
    event: null
  },
  page: '',
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_FEATURED_EVENTS:
      return {
        ...state,
        featured: {
          loading: false,
          events: payload
        },
        error: null
      };
    case GET_EXPLORE_EVENTS:
      return {
        ...state,
        explore: {
          loading: false,
          events: payload
        },
        error: null
      };
    case GET_DETAILS_EVENT:
      return {
        ...state,
        details: {
          loading: false,
          event: payload
        },
        error: null
      };
    case FEATURED_LOADING:
      return {
        ...state,
        featured: {
          ...state.featured,
          loading: true
        }
      };
    case EXPLORE_LOADING:
      return {
        ...state,
        explore: {
          events: null,
          loading: true
        },
        error: null
      };
    case DETAILS_LOADING:
      return {
        ...state,
        details: {
          ...state.details,
          loading: true
        },
        error: null
      };
    case UPDATE_FEATURED:
      return {
        ...state,
        explore: {
          events: state.explore.events.map(event =>
            event._id === payload
              ? { ...event, featured: !event.featured }
              : event
          ),
          loading: false
        }
      };
    case SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case CLEAR_EVENTS:
      return {
        featured: {
          loading: true,
          events: null
        },
        explore: {
          loading: true,
          events: null
        },
        details: {
          loading: true,
          event: null
        },
        page: '',
        error: null
      };
    case EVENT_ERROR:
      return {
        ...state,
        featured: {
          ...state.featured,
          loading: false
        },
        details: {
          ...state.details,
          loading: false
        },
        error: payload
      };
    default:
      return state;
  }
}
