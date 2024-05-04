import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import {CgProfile} from 'react-icons/cg';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector((state) => state.isAuthenticated);

    const {
        setIsVisibleSignInModal,
        setIsAuthenticated,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const renderLinksForUnauthenticatedUser = () => (
        <>
            <div
                onClick={() => setIsVisibleSignInModal(true)}
                className={'link'}
            >
                Birthdays
            </div>
            <div
                onClick={() => setIsVisibleSignInModal(true)}
                className={'link icon-container'}
            >
                <span>My profile</span>
                <CgProfile className={'profile-icon'}/>
            </div>
        </>
    );

    const renderLinksForAuthenticatedUser = () => (
        <>
            <Link
                to={`/birthdays`}
                className={'link'}
            >
                Birthdays
            </Link>
            <Link
                to={`/profile`}
                className={'link icon-container'}
            >
                <span>My profile</span>
                <img
                    src={process.env.PUBLIC_URL + '/profile-icon.png'}
                    alt={'profile-icon'}
                    className={'profile-icon'}
                />
            </Link>
        </>
    );

    const renderHeader = () => {
        return (
            <>
                <div>
                    <Link
                        to={`/`}
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
                        isAuthenticated
                            ? renderLinksForAuthenticatedUser()
                            : renderLinksForUnauthenticatedUser()
                    }
                    <a
                        href={'#footer'}
                        className={'link'}
                    >
                        Contacts
                    </a>
                </div>
            </>
        );
    }

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token'));
    }, []);

    return (
        <header>
            {renderHeader()}
        </header>
    );
}

export default Header;
