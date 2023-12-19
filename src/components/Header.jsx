import React from 'react';
import {Link} from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
import {baseUrl} from '../constants';

const Header = () => {
    const renderLinksForAuthenticatedUser = () => (
        <>
            <Link
                to={`${baseUrl}/birthdays`}
                className={'link'}
            >
                Birthdays
            </Link>
            <Link
                to={`${baseUrl}/profile`}
                className={'link profile-icon-container'}
            >
                <span>My profile</span>
                <CgProfile className={'profile-icon'}/>
            </Link>
        </>
    );

    const renderHeader = () => {
        return (
            <>
                <div>
                    <Link
                        to={`${baseUrl}`}
                        className={'link'}
                    >
                        Birthday Reminder
                    </Link>
                </div>
                <div className={'link-container'}>
                    {isAuthenticated() && renderLinksForAuthenticatedUser()}
                </div>
            </>
        );
    }

    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    }

    const handleSignIn = () => {
        alert('Please Sing In');
    }

    return (
        <header>
            {renderHeader()}
        </header>
    );
}

export default Header;
