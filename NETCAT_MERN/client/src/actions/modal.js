import { OPEN_MODAL, CLOSE_MODAL } from './types';

export const openModal = (featured, id) => dispatch => {
  let url;
  if (featured) {
    url = `http://localhost:3000/details/${id}?featured=true`;
  } else {
    url = `http://localhost:3000/details/${id}`;
  }

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
