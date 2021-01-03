import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, exact }) => {
  const { isAuthenticated, user } = JSON.parse(localStorage.getItem('currentUser') || '{}')
  return (
      <Route path={path} exact={exact} render={(props) => (
        isAuthenticated && user.isAdmin ? (
          <Component {...props} />
        ) : (
            // Redirect to the tweets page if the user is authenticated
            <Redirect to="/" />
          )
      )} />
    )
  }




export const AuthRoute = withRouter(Auth);

