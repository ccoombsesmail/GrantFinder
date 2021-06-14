import React, { useState } from 'react'
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import SearchBar from './components/SearchBar/SearchBar';
import { AuthRoute } from './util/route_util'
import GrantForm from './components/GrantForm/GrantForm';
import ExportGrantData from './components/ExportGrantData/ExportGrantData'
import ImportGrantData from './components/ImportGrantData/ImportGrantData'
import DeleteTags from './components/DeleteTags/DeleteTags'

function App() {
  const [showModal, toggleModal] = useState([false, null])
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}').isAuthenticated)

  return (
    
    <main>
      {
        showModal[0] ? <Modal type={showModal[1]} toggleModal={toggleModal} setLoggedIn={setLoggedIn} /> : null
      }
      <HashRouter>
      <Header toggleModal={toggleModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <AuthRoute exact component={GrantForm} path="/admin/addgrant" /> 
          <AuthRoute exact component={SearchBar} path="/admin/editgrant" /> 
          <AuthRoute exact component={GrantForm} path="/admin/editgrant/:grantId" /> 
          <AuthRoute exact component={DeleteTags} path="/admin/deletetag" /> 
          <AuthRoute exact component={ImportGrantData} path="/admin/uploadgrants" /> 
          <AuthRoute exact component={ExportGrantData} path="/admin/downloadgrants" /> 
          <Route path="/">
            <SearchBar />
          </Route>
        </Switch>
      </HashRouter>
    </main>
  );
}

export default App
