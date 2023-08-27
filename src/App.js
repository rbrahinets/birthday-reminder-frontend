import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
