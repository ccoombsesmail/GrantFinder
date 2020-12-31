import React, { useState } from 'react'
import styles from './GrantForm.module.css'
import { createGrant } from '../../util/grants_api_util'

const GrantForm = () => {

  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState('')
  const [amount, setAmount] = useState('')

  const update = (type) => {
    switch (type) {
      case 'department':
        return (e) => {
          setDepartment(e.currentTarget.value)
        }
      case 'title':
        return (e) => {
          setTitle(e.currentTarget.value)
        }
      case 'amount':
        return (e) => {
          setAmount(e.currentTarget.value)
        }
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const grant = {
      grant_title: title,
      tags: [department],
      amount,
      username: JSON.parse(localStorage.getItem('currentUser')).user.username 
    }
    createGrant(grant).then((res) => console.log(res))
  }

  return (
    
    <div className={styles.grantFormWrapper}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <h1>
          Enter New Grant
        </h1>
        <label className={styles.formLabel}>
          <h4>Title</h4>
          <input
            maxLength={100}
            className={styles.formInput}
            type="text" value={title}
            onChange={update('title')}
            autoComplete="off" />
        </label>
        <label className={styles.formLabel}>
          <h4>Department</h4>
          <input
            className={styles.formInput}
            type="text"
            value={department}
            onChange={update('department')} />
        </label>
        <label className={styles.formLabel}>
          <h4>Amount</h4>
          <input
            className={styles.formInput}
            type="text"
            value={amount}
            onChange={update('amount')} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default GrantForm;
