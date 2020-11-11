import React, { useState } from 'react'
import './App.css';
// import { HashRouter } from 'react-router-dom'
import Header from './Components/Header/Header';
import Modal from './Components/Modal/Modal';
import wavyImg from './assets/images/wavy.jpg'
import SearchBar from './Components/SearchBar/SearchBar';
function App() {
  const [showModal, toggleModal] = useState([false, null])
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('currentUser')).isAuthenticated)

  return (
    <main >
      {
        showModal[0] ? <Modal type={showModal[1]} toggleModal={toggleModal} setLoggedIn={setLoggedIn} /> : null
      }
      <Header toggleModal={toggleModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <SearchBar />
      <img src={wavyImg} alt="" />
    </main>
  );
}

export default App;
