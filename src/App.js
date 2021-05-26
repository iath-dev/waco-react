import { ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import theme from './config/theme';
import useFirebase from './hooks/firebase';
import HomeView from './views/home';
import LoginView from './views/login';

function App() {
  const fb = useFirebase();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true)
      } else (
        setIsAuthenticated(false)
      )
    })
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <PrivateRoute isAuthenticated={isAuthenticated} component={HomeView} path="/" exact />
            <PublicRoute isAuthenticated={isAuthenticated} component={LoginView} path="/login" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
