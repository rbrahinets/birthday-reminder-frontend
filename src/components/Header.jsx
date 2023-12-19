import React from 'react';
import {Link} from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
import {baseUrl} from '../constants';

const Header = () => {
    const renderLinksForUnauthenticatedUser = () => (
        <>
            <div
                onClick={handleSignIn}
                className={'link'}
            >
                Birthdays
            </div>
            <div
                onClick={handleSignIn}
                className={'link profile-icon-container'}
            >
                <span>My profile</span>
                <CgProfile className={'profile-icon'}/>
            </div>
        </>
    );

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
                        <img
                            src={process.env.PUBLIC_URL + '/logo.png'}
                            alt={'logo'}
                            className={'logo'}
                        />
                    </Link>
                </div>
                <div className={'link-container'}>
                    {
                        isAuthenticated()
                            ? renderLinksForAuthenticatedUser()
                            : renderLinksForUnauthenticatedUser()
                    }
                    <a
                        href={'#footer'}
                        className={'link'}
                    >
                        Authors
                    </a>
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
