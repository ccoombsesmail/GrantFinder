import React from 'react'
import LoginForm from '../SessionForms/LoginForm';
import RegisterForm from '../SessionForms/RegisterForm';

import styles from './Modal.module.css'

const Modal = ({ type, toggleModal, setLoggedIn }) => {
  let component
  switch (type) {
    case 'login':
      component = <LoginForm toggleModal={toggleModal} setLoggedIn={setLoggedIn} />
      break;
    case 'register':
      component = <RegisterForm toggleModal={toggleModal} setLoggedIn={setLoggedIn} />
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
