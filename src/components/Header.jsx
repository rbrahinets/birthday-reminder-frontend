import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './styles.css';
import {baseUrl} from '../constants';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const Header = () => {
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const navigation = useNavigate();

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const handleShowSignInModal = () => {
        setShowSignInModal(true);
    };

    const handleHideSignInModal = () => {
        setShowSignInModal(false);
    };

    const handleShowSignUpModal = () => {
        setShowSignUpModal(true);
    };

    const handleHideSignUpModal = () => {
        setShowSignUpModal(false);
    };

    const renderHeaderForUnauthenticatedUser = () => {
        return (
            <>
                <div
                    onClick={handleShowSignInModal}
                    className={'link'}
                >
                    My profile
                </div>
                <SignInModal
                    show={showSignInModal}
                    onHide={handleHideSignInModal}
                    onShowSignUpModal={handleShowSignUpModal}
                />
                <SignUpModal
                    show={showSignUpModal}
                    onHide={handleHideSignUpModal}
                    onShowSignInModal={handleShowSignInModal}
                />
            </>
        )
    }

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
            {!getToken() && renderHeaderForUnauthenticatedUser()}
            {getToken() && renderHeaderForAuthenticatedUser()}
        </header>
    );
};

export default Header;
