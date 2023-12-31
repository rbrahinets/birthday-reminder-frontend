import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main';
import Birthdays from './pages/Birthdays';
import NewFriend from './pages/NewFriend';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';

const url = '/birthday-reminder-frontend';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={`${url}/`} element={<Main/>}/>
                <Route path={`${url}/birthdays`} element={<Birthdays/>}/>
                <Route path={`${url}/new-friend`} element={<NewFriend/>}/>
                <Route path={`${url}/profile`} element={<Profile/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
