import SignUp from './components/Auth/SignUp';
import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import { Switch } from 'react-router-dom';
import LogIn from './components/Auth/Login';
import Home from './components/Pages/Home';
import Navbar from './components/Pages/Navbar';
import Inbox from './components/Mail/Inbox';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/' >
          <LogIn />
        </Route>
        <Route path='/signup' >
          <SignUp />
        </Route>
        <Route path='/login'  >
          <LogIn />
        </Route>
        <Route path='/home' >
          <Home />
        </Route>
        <Route path="/inbox">
          <Inbox />
        </Route>
      </Switch>
    </>
  )
}


export default App;