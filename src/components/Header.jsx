import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { baseUrl } from '../constants';

const Header = () => {
    const [isLogged, setLogged] = useState(false);
    const currentPage = window.location.href.split('/').reverse()[0];

    const handleSingOutClick = () => {
        localStorage.removeItem('token');
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
                        <Link to={`${baseUrl}/sign-in`} className={'link'}>
                            Sign In
                        </Link>
                    )}
                    {currentPage !== 'sign-up' && (
                        <Link to={`${baseUrl}/sign-up`} className={'link'}>
                            Sign Up
                        </Link>
                    )}
                </>
            )}
            {isLogged && (
                <Link
                    to={`${baseUrl}/sign-in`}
                    onClick={handleSingOutClick}
                    className={'link'}
                >
                    Sign Out
                </Link>
            )}
        </header>
    );
};

export default Header;
