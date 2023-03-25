import React from "react";
import "./App.css";
import AuthPage from "./components/Pages/AuthPage";
import { Route } from "react-router-dom";
import Mailfirst from "./components/Mail/ComposeMail";

function App() {
  return (
    <main>
    <h1>MailBox</h1>
    <Route path="/" exact>
      <AuthPage />
    </Route>
    <Route path="/auth" exact>
      <AuthPage />
    </Route>
    <Route path="/mail">
      <Mailfirst/>
    </Route>
  </main>
);
}

export default App;