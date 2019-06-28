import { TOGGLE_MODAL } from './types';

export const toggleModalDisplay = () => dispatch => {
  dispatch({
    type: TOGGLE_MODAL
  });
};
