import React, { useState } from 'react'
import styles from './Header.module.css'
import { logout } from '../../util/session_api_util'
import logo from '../../assets/images/logo.png'
const Header = ({ toggleModal, loggedIn, setLoggedIn }) => {

  
  const signOut = () => {
    logout()
    setLoggedIn(JSON.parse(localStorage.getItem('currentUser')).isAuthenticated)
  }
  return (
    <header>
      <div className={styles.left}>
        <img src={logo} alt="" />
        <h1>
          Grant Finder
        </h1>
      </div>
      {
        loggedIn ? ( 
          <div className={styles.right}>
            <button onClick={signOut}>
              Logout
            </button>
          </div>
        ) : (
            <div className={styles.right}>
              <button onClick={() => toggleModal([true, 'login'])}>
                Login
              </button>
              <button onClick={() => toggleModal([true, 'register'])}>
                Register
              </button>
            </div>
        )
      }
    
    </header>
  )
}

export default Header

