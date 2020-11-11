import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};


export const logout = () => {
  localStorage.removeItem('jwtToken')
  // Remove the token from the common axios header
  setAuthToken(false)
  window.session = null
}


export const register = (userData) => {
  return axios.post('/api/users/register', userData);
}

export const login = (userData) => {
  return axios.post('/api/users/login', userData);
}