import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // Remove token from the headers
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
