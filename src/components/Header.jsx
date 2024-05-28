import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
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
                Дні народження
            </div>
            <div
                onClick={() => setIsVisibleSignInModal(true)}
                className={'link icon-container'}
            >
                <span>Профіль</span>
                <img
                    src={process.env.PUBLIC_URL + '/profile-icon.png'}
                    alt={'profile-icon'}
                    className={'profile-icon'}
                />
            </div>
        </>
    );

    const renderLinksForAuthenticatedUser = () => (
        <>
            <Link
                to={`/birthdays`}
                className={'link'}
            >
                Дні народження
            </Link>
            <Link
                to={`/profile`}
                className={'link icon-container'}
            >
                <span>Профіль</span>
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
                        Контакти
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
