import React, { useState } from 'react'
import styles from './SessionForm.module.css'
import { login, setAuthToken } from '../../util/session_api_util'
import jwt_decode from 'jwt-decode';

const LoginForm = ({ toggleModal, setLoggedIn }) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toggle = () => {
    toggleModal([false, null])
    setLoggedIn(JSON.parse(localStorage.getItem('currentUser')).isAuthenticated)
  }
  
  const update = (type) => {
    switch (type) {
      case 'email':
        return (e) => {
          setEmail(e.currentTarget.value)
        }
      case 'password':
        return (e) => {
          setPassword(e.currentTarget.value)
        }
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password })
      .then((res) => {
        console.log(res)
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        localStorage.setItem('currentUser', JSON.stringify({ isAuthenticated: true, user: decoded }))
      })
      .then(() => toggle())
      .catch((res) => console.log(res))
  }

    return (
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1>
              Login
            </h1>
            <label className={styles.formLabel}>
              <h4>Email</h4>
              <input 
                maxLength={52} 
                id="username" 
                className={styles.formInput} 
                type="text" value={email} 
                onChange={update('email')} 
                autoComplete="off" />
            </label>
            {/* {
              errors && errors.usernameError ? <h3>{errors.usernameError}</h3> : null
            } */}
            <label className={styles.formLabel}>
              <h4>Password</h4>
              <input 
              className={styles.formInput} 
              type="password" 
              value={password} 
              onChange={update('password')} />
            </label>
            {/* {
              errors && errors.passwordError ? <h3>{errors.passwordError}</h3> : null
            } */}
            <button type="submit">Login</button>
          </form>
      )
  }


export default LoginForm
