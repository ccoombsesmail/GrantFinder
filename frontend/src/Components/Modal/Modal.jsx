import React from 'react'
import LoginForm from '../SessionForms/LoginForm';
import RegisterForm from '../SessionForms/RegisterForm';

import styles from './Modal.module.css'

const Modal = ({ type, toggleModal }) => {
  let component
  switch (type) {
    case 'login':
      component = <LoginForm />
      break;
    case 'register':
      component = <RegisterForm />
      break;
    default:
      break;
  }
  return (
    <div className={styles.modalBg} onClick={() => toggleModal([false, null])}>
      <div className={styles.modalChild} onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  )
}

export default Modal
