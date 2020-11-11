import React, { useState } from 'react'
import styles from './Header.module.css'
import { logout } from '../../util/session_api_util'

const Header = ({ toggleModal }) => {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwtToken'))
  
  return (
    <header>
      <div className={styles.left}>
        Grant Finder
      </div>
      {
        loggedIn ? ( 
            <button onClick={logout}>
              Logout
            </button>
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

