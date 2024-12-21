import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Birthdays from './pages/Birthdays';
import Birthday from './pages/Birthday';
import BirthdayNew from './pages/BirthdayNew';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  const getRoutes = () => {
    return (
      <Routes>
        <Route
          path={'/'}
          element={<Main/>}
        />
        <Route
          path={'/login'}
          element={<Login/>}
        />
        <Route
          path={'/birthdays'}
          element={<Birthdays/>}
        />
        <Route
          path={'/birthdays/birthday'}
          element={<Birthday/>}
        />
        <Route
          path={'/new-birthday'}
          element={<BirthdayNew/>}
        />
        <Route
          path={'/profile'}
          element={<Profile/>}
        />
        <Route
          path="*"
          element={<PageNotFound/>}
        />
      </Routes>
    );
  };

  return (
    <Router basename={''}>
      {getRoutes()}
    </Router>
  );
};

export default App;
