import React, { useState } from 'react'
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import Modal from './Components/Modal/Modal';
import SearchBar from './Components/SearchBar/SearchBar';
import { AuthRoute } from './util/route_util'
import wavyImg from './assets/images/wavy.jpg'
import GrantForm from './Components/GrantForm/GrantForm';


function App() {
  const [showModal, toggleModal] = useState([false, null])
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('currentUser')).isAuthenticated)

  return (
    <main >
      {
        showModal[0] ? <Modal type={showModal[1]} toggleModal={toggleModal} setLoggedIn={setLoggedIn} /> : null
      }
      <Header toggleModal={toggleModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <HashRouter>
        <Switch>
          <AuthRoute exact component={GrantForm} path="/admin/addgrant" /> 
          <Route path="/">
            <SearchBar />
            <img src={wavyImg} alt="" />
          </Route>
        </Switch>
      </HashRouter>
    </main>
  );
}

export default App;
