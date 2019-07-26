import { OPEN_MODAL, CLOSE_MODAL } from './types';

export const openModal = id => dispatch => {
  const url = `http://localhost:3000/details/${id}`;

  dispatch({
    type: OPEN_MODAL,
    payload: url
  });
};

export const closeModal = () => dispatch => {
  dispatch({
    type: CLOSE_MODAL
  });
};
