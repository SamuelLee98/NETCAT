import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const initialState = {
  onDisplay: false,
  url: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      return {
        onDisplay: true,
        url: payload
      };
    case CLOSE_MODAL:
      return {
        onDisplay: false,
        url: ''
      };
    default:
      return state;
  }
}
