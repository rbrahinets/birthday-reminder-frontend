import React from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../constants';
import Header from '../components/Header';
import Button from '../components/Button';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleMainClick = () => {
        navigate(`${baseUrl}/`);
    };

    return (
        <>
            <Header />
            <h1>Oops...</h1>
            <h2>Page Not Found</h2>
            <Button text={'Main'} onClick={handleMainClick} />
        </>
    );
};

export default PageNotFound;
