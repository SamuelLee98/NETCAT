import {
  GET_MORE_EVENTS,
  GET_FEATURED_EVENTS,
  GET_EXPLORE_EVENTS,
  GET_DETAILS_EVENT,
  EVENT_ERROR,
  MORE_LOADING,
  EXPLORE_LOADING,
  FEATURED_LOADING,
  DETAILS_LOADING,
  SET_PAGE,
  CLEAR_EVENTS
} from '../actions/types';

const initialState = {
  more: {
    loading: true,
    events: null
  },
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
    case GET_MORE_EVENTS:
      return {
        ...state,
        more: {
          loading: false,
          events: payload
        },
        error: null
      };
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
    case MORE_LOADING:
      return {
        ...state,
        more: {
          ...state.more,
          loading: true
        },
        error: null
      };
    case EXPLORE_LOADING:
      return {
        ...state,
        explore: {
          ...state.explore,
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
    case SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case CLEAR_EVENTS:
      return {
        more: {
          loading: true,
          events: null
        },
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
        more: {
          ...state.more,
          loading: false
        },
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
