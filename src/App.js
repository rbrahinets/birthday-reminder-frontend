import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
          element={<ProtectedRoute><Birthdays/></ProtectedRoute>}
        />
        <Route
          path={'/birthdays/birthday'}
          element={<ProtectedRoute><Birthday/></ProtectedRoute>}
        />
        <Route
          path={'/new-birthday'}
          element={<ProtectedRoute><BirthdayNew/></ProtectedRoute>}
        />
        <Route
          path={'/profile'}
          element={<ProtectedRoute><Profile/></ProtectedRoute>}
        />
        <Route
          path='*'
          element={<PageNotFound/>}
        />
      </Routes>
    );
  }

  return (
    <Router basename={''}>
      {getRoutes()}
    </Router>
  );
}

export default App;
