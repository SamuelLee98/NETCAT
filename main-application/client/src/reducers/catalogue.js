import {
  GET_CATALOGUE,
  ADD_EVENT_TO_CATALOGUE,
  CATALOGUE_ERROR,
  CLEAR_CATALOGUE,
  CATALOGUE_LOADING,
  DELETE_EVENT_FROM_CATALOGUE
} from '../actions/types';

const initialState = {
  events: null,
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATALOGUE:
      return {
        events: payload,
        loading: false,
        error: null
      };
    case CATALOGUE_LOADING:
      return {
        events: null,
        loading: true,
        error: null
      };
    case DELETE_EVENT_FROM_CATALOGUE:
      return {
        events: state.events.filter(event => event._id !== payload),
        loading: false,
        error: null
      };
    case CLEAR_CATALOGUE:
      return {
        events: null,
        loading: false,
        error: null
      };
    case CATALOGUE_ERROR:
      return {
        events: null,
        error: payload,
        loading: false
      };
    case ADD_EVENT_TO_CATALOGUE:
    default:
      return state;
  }
}
