import { Fragment } from 'react';
// import './Login.css';
import './App.css';
import Home from './Components/pages/Home';
import About from './Components/pages/About';
import Navbar from './Components/layout/Navbar'
import Alerts from './Components/layout/Alerts'
import Registration from './Components/auth/index'
import PrivateRoute from './Components/routing/PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setToken from './utils/setToken';

 if (localStorage.token) {
   setToken(localStorage.token);
 }
const App = () => {
  return (
    
    <AlertState>
      <AuthState>
        <ContactState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts/>
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <Route exact path='/about-us' component={About} />
                    <Route
                      exact
                      path='/registration'
                      component={Registration}
                    />
                  </Switch>
                </div>
              </Fragment>
            </Router>
        </ContactState>
      </AuthState>
          </AlertState>
    
  );
};

export default App;
