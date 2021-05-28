import React, {useState, useEffect}       from 'react';
import { render }                         from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// ==============================================
// ==============================================

import './global-styles/styles.scss';

// ==============================================
// ==============================================

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary:   {main: '#ffffff'},
    secondary: {main: '#000000'}
  },
});

// ==============================================
// ==============================================

import PublicHomePage     from './components/pages/home/public/public.js';
import ClientHomePage     from './components/pages/home/client/client.js';
import InstructorHomePage from './components/pages/home/instructor/instructor.js';
import RegisterPage       from './components/pages/register/register.js';
import LoginPage          from './components/pages/login/login.js';

// ==============================================
// ==============================================

const App = () => {

  // --------------------------------------------

  const [logged_in, setLoggedIn] = useState(true);
  const [role, setRole] = useState('instructor');

  // --------------------------------------------

  return (
    <Router>

      <Route exact path="/">
        {logged_in && role=='client' ? <ClientHomePage /> : 
          logged_in && role=='instructor' ? <InstructorHomePage /> : 
            <PublicHomePage />
        }
      </Route>

      <Route path="/register">
        <RegisterPage></RegisterPage>
      </Route>

      <Route path="/login">
        <LoginPage setLoggedIn={setLoggedIn} setRole={setRole}></LoginPage>
      </Route>
    
    </Router>
  ); // return

  // --------------------------------------------
};

// ==============================================
// ==============================================

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);