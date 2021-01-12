import React, { useState } from 'react'
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import SearchBar from './components/SearchBar/SearchBar';
import { AuthRoute } from './util/route_util'
import GrantForm from './components/GrantForm/GrantForm';
import ExportGrantData from './components/ExportGrantData/ExportGrantData'
import DeleteTags from './components/DeleteTags/DeleteTags'

const UserContext = React.createContext('user');


function App() {
  const [showModal, toggleModal] = useState([false, null])
  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}').isAuthenticated)

  return (
    
    <main >
      {
        showModal[0] ? <Modal type={showModal[1]} toggleModal={toggleModal} setLoggedIn={setLoggedIn} /> : null
      }
      <Header toggleModal={toggleModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <HashRouter>
        <Switch>
          <AuthRoute exact component={GrantForm} path="/admin/addgrant" /> 
          <AuthRoute exact component={SearchBar} path="/admin/editgrant" /> 
          <AuthRoute exact component={GrantForm} path="/admin/editgrant/:grantId" /> 
          <AuthRoute exact component={DeleteTags} path="/admin/deletetag" /> 
          <AuthRoute exact component={ExportGrantData} path="/admin/downloadgrants" /> 
          <Route path="/">
            <SearchBar />
            {/* <img src={banner} alt="" /> */}
          </Route>
        </Switch>
      </HashRouter>
      {/* <footer></footer> */}
    </main>
  );
}

export default App
