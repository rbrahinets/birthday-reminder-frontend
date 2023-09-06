import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { baseUrl } from '../constants';

const Header = () => {
    const currentPage = window.location.href.split('/').reverse()[0];

    const handleSingOutClick = () => {
        localStorage.removeItem('token');
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    return (
        <header>
            <h1>Birthday Reminder</h1>
            {!getToken() && (
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
            {getToken() && (
                <>
                    <Link to={`${baseUrl}/`} className={'link'}>
                        Main
                    </Link>
                    <Link
                        to={`${baseUrl}/sign-in`}
                        onClick={handleSingOutClick}
                        className={'link'}
                    >
                        Sign Out
                    </Link>
                </>
            )}
        </header>
    );
};

export default Header;
