import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';

const url = '/birthday-reminder-frontend';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={`${url}/`} element={<Main />} />
                <Route path={`${url}/sign-in`} element={<SignIn />} />
                <Route path={`${url}/sign-up`} element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
