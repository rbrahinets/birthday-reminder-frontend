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
                    onClick={handleSingOutClick}
                    className={'link'}
                >
                    Sign Out
                </Link>
            </>
        );
    };

    const handleMainClick = () => {
        navigation(`${baseUrl}/`);
    };

    const handleSingOutClick = () => {
        localStorage.removeItem('token');
    };

    return (
        <header>
            <h1 className={'main-link'} onClick={handleMainClick}>
                Birthday Reminder
            </h1>
            {getToken() && renderHeaderForAuthenticatedUser()}
        </header>
    );
};

export default Header;
