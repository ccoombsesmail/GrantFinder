import React, { useState } from 'react'
import './App.css';
// import { HashRouter } from 'react-router-dom'
import Header from './Components/Header/Header';
import Modal from './Components/Modal/Modal';

function App() {
  const [showModal, toggleModal] = useState([false, null])

  return (
    <main >
      {
        showModal[0] ? <Modal type={showModal[1]} toggleModal={toggleModal} /> : null
      }
      <Header toggleModal={toggleModal} />
      
      Hey
    </main>
  );
}

export default App;
