import './App.css';
import AuthForm from './components/AuthForm';
import Home from './components/Pages/Home';
import { Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <Route path="*">
        <Redirect to="authpage" />
      </Route>
      <Switch>
        <Route path="/authpage">
          <AuthForm />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;