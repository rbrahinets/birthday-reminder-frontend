import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './styles.css';
import {baseUrl} from '../constants';

const Header = () => {
    const navigation = useNavigate();

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const renderHeaderForAuthenticatedUser = () => {
        return (
            <>
                <Link
                    to={`${baseUrl}/`}
                    onClick={handleSingOut}
                    className={'link'}
                >
                    Sign Out
                </Link>
            </>
        );
    };

    const handleMain = () => {
        navigation(`${baseUrl}/`);
    };

    const handleSingOut = () => {
        localStorage.removeItem('token');
    };

    return (
        <header>
            <h1
                onClick={handleMain}
                className={'main-link'}
            >
                Birthday Reminder
            </h1>
            {getToken() && renderHeaderForAuthenticatedUser()}
        </header>
    );
};

export default Header;
