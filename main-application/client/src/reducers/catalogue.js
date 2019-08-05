import {
  GET_CATALOGUE_EVENTS,
  GET_CATALOGUE_IDS,
  ADD_TO_CATALOGUE,
  CATALOGUE_ERROR,
  CLEAR_CATALOGUE,
  CATALOGUE_LOADING,
  DELETE_FROM_CATALOGUE_EVENTS,
  DELETE_FROM_CATALOGUE_IDS
} from '../actions/types';

const initialState = {
  events: null,
  ids: null,
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATALOGUE_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
        error: null
      };
    case GET_CATALOGUE_IDS:
      return {
        ...state,
        ids: payload,
        loading: false,
        error: null
      };
    case CATALOGUE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_TO_CATALOGUE:
      return {
        ...state,
        ids: [...state.ids, payload]
      };
    case DELETE_FROM_CATALOGUE_IDS:
      return {
        ...state,
        ids: state.ids.filter(id => id !== payload)
      };
    case DELETE_FROM_CATALOGUE_EVENTS:
      return {
        ...state,
        events: state.events.filter(event => event._id !== payload)
      };
    case CLEAR_CATALOGUE:
      return {
        ids: null,
        events: null,
        loading: false,
        error: null
      };
    case CATALOGUE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
