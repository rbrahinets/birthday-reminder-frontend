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
        <Router basename={url}>
            <Routes>
                <Route path={`/`} element={<Main/>}/>
                <Route path={`/birthdays`} element={<Birthdays/>}/>
                <Route path={`/birthdays/friend`} element={<BirthdayInfo/>}/>
                <Route path={`/birthdays/friend/edit`} element={<BirthdayInfoEdit/>}/>
                <Route path={`/new-friend`} element={<NewFriend/>}/>
                <Route path={`/profile`} element={<Profile/>}/>
                <Route path={`/profile/edit`} element={<EditProfile/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
