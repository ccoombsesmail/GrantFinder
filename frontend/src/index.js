import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import jwt_decode from 'jwt-decode'
import { setAuthToken } from './util/session_api_util'
import { logout } from './util/session_api_util'
import './index.css'

document.addEventListener('DOMContentLoaded', () => {

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);
    
    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);
    localStorage.setItem('currentUser', JSON.stringify({ isAuthenticated: true, user: decodedUser }))
    // window.session = { session: { isAuthenticated: true, user: decodedUser } };

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      logout()
      window.location.href = '/login';
    }
  } else {
    localStorage.setItem('currentUser', JSON.stringify({ isAuthenticated: false, user: null }))
  }

  // Render our root component and pass in the store as a prop
  const root = document.getElementById('root');

  ReactDOM.render(<App />, root);
});