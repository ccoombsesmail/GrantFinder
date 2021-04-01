import React, { useState } from 'react'
import styles from './Header.module.css'
import { logout } from '../../util/session_api_util'
import logo from '../../assets/images/moth_mimesis.svg'
import logo2 from '../../assets/images/cu.png'
import { Link } from 'react-router-dom'
const Header = ({ toggleModal, loggedIn, setLoggedIn }) => {

  
  const signOut = () => {
    logout()
    setLoggedIn(JSON.parse(localStorage.getItem('currentUser')).isAuthenticated)
  }
  return (
    <header>
      <div className={styles.left}>
        <Link to='/'>
          <img src={logo} alt="" />
        </Link>
        {/* <h1>
          Grant Finder
        </h1> */}
      </div>
      {
        loggedIn ? ( 
          <div className={styles.right}>
            <button onClick={signOut}>
              Logout
            </button>
            <a href='https://www.colorado.edu/center/cdem/' target="_blank">
              <img src={logo2} alt="" />
            </a>
          </div>
        ) : (
            <div className={styles.right}>
              <button onClick={() => toggleModal([true, 'login'])}>
                Login
              </button>
              <button onClick={() => toggleModal([true, 'register'])}>
                Register
              </button>
              <a href='https://www.colorado.edu/center/cdem/' target="_blank"> 
                <img src={logo2} alt="" />
              </a>
            </div>
        )
      }
    
    </header>
  )
}

export default Header;

