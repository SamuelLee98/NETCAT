import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  PROFILE_LOADING
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        profile: payload,
        loading: false,
        error: {}
      };
    case PROFILE_ERROR:
      return {
        profile: null,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        profile: null,
        loading: true,
        error: {}
      };
    case PROFILE_LOADING:
      return {
        profile: null,
        loading: true,
        error: {}
      };
    default:
      return state;
  }
}
