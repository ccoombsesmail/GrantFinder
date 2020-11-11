import React, { useState } from 'react'
import styles from './SessionForm.module.css'
import { login } from '../../util/session_api_util'

const LoginForm = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const update = (type) => {
    switch (type) {
      case 'username':
        return (e) => {
          setUsername(e.currentTarget.value)
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
    login({ username, password })
      .then((res) => console.log(res))
      .fail((res) => {
        console.log(res)
      })
  }

    return (
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1>
              Login
            </h1>
            <label className={styles.formLabel}>
              <h4>Username</h4>
              <input 
                maxLength={16} 
                id="username" 
                className={styles.formInput} 
                type="text" value={username} 
                onChange={update('username')} 
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
