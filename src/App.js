import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Main from './pages/Main';
import Birthdays from './pages/Birthdays';
import BirthdayInfo from './pages/BirthdayInfo';
import BirthdayInfoEdit from './pages/BirthdayInfoEdit';
import BirthdayNew from './pages/BirthdayNew';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

const url = '/birthday-reminder-frontend';

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
          element={<ProtectedRoute><BirthdayInfo/></ProtectedRoute>}
        />
        <Route
          path={'/birthdays/birthday/edit'}
          element={<ProtectedRoute><BirthdayInfoEdit/></ProtectedRoute>}
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
    <Router basename={url}>
      {getRoutes()}
    </Router>
  );
}

export default App;
