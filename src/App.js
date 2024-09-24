import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main';
import Birthdays from './pages/Birthdays';
import BirthdayInfo from './pages/BirthdayInfo';
import BirthdayInfoEdit from './pages/BirthdayInfoEdit';
import BirthdayNew from './pages/BirthdayNew';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

const url = '/birthday-reminder-frontend';

const App = () => {
  return (
    <Router basename={url}>
      <Routes>
        <Route path={`/`} element={<Main/>}/>
        <Route path={`/birthdays`} element={<Birthdays/>}/>
        <Route path={`/birthdays/birthday`} element={<BirthdayInfo/>}/>
        <Route path={`/birthdays/birthday/edit`} element={<BirthdayInfoEdit/>}/>
        <Route path={`/new-birthday`} element={<BirthdayNew/>}/>
        <Route path={`/profile`} element={<Profile/>}/>0
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
