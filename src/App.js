import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default App;
