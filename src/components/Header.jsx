import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import Button from './Button';
import { baseUrl } from '../constants';

const Header = () => {
    const navigate = useNavigate();
    const [isLogged, setLogged] = useState(false);
    const currentPage = window.location.href.split('/').reverse()[0];

    const handleSingInClick = () => {
        navigate(`${baseUrl}/sign-in`);
    };

    const handleSingUpClick = () => {
        navigate(`${baseUrl}/sign-up`);
    };

    const handleSingOutClick = () => {
        localStorage.removeItem('token');
        navigate(`${baseUrl}/sign-in`);
    };

    useEffect(() => {
        setLogged(localStorage.getItem('token') ? true : false);
    }, [setLogged]);

    return (
        <header>
            <h1>Birthday Reminder</h1>
            {!isLogged && (
                <>
                    {currentPage !== 'sign-in' && (
                        <Button text={'Sign In'} onClick={handleSingInClick} />
                    )}
                    {currentPage !== 'sign-up' && (
                        <Button text={'Sign Up'} onClick={handleSingUpClick} />
                    )}
                </>
            )}
            {isLogged && (
                <Button text={'Sign Out'} onClick={handleSingOutClick} />
            )}
        </header>
    );
};

export default Header;
