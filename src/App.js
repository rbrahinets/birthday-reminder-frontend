import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main';
import Birthdays from './pages/Birthdays';
import BirthdayInfo from './pages/BirthdayInfo';
import BirthdayInfoEdit from './pages/BirthdayInfoEdit';
import NewFriend from './pages/NewFriend';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import PageNotFound from './pages/PageNotFound';

const url = '/birthday-reminder-frontend';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={`${url}/`} element={<Main/>}/>
                <Route path={`${url}/birthdays`} element={<Birthdays/>}/>
                <Route path={`${url}/birthdays/friend`} element={<BirthdayInfo/>}/>
                <Route path={`${url}/birthdays/friend/edit`} element={<BirthdayInfoEdit/>}/>
                <Route path={`${url}/new-friend`} element={<NewFriend/>}/>
                <Route path={`${url}/profile`} element={<Profile/>}/>
                <Route path={`${url}/profile/edit`} element={<EditProfile/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
