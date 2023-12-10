import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Main from './pages/Main';
import PageNotFound from './pages/PageNotFound';

const url = '/birthday-reminder-frontend';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path={`${url}/`} element={<Main/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </Router>
    );
};

export default App;
