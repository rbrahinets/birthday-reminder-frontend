import React from 'react';
import {Link} from 'react-router-dom';
import {baseUrl} from '../constants';

const Header = () => {
    const renderHeader = () => {
        return (
            <>
                <Link
                    to={`${baseUrl}`}
                    className={'link'}
                >
                    Birthday Reminder
                </Link>
                {isTokenExist() &&
                    <>
                        <Link
                            to={`${baseUrl}/birthdays`}
                            className={'link'}
                        >
                            Birthdays
                        </Link>
                        <Link
                            to={`${baseUrl}/profile`}
                            className={'link'}
                        >
                            My profile
                        </Link>
                    </>
                }
            </>
        );
    }

    const isTokenExist = () => {
        return !!localStorage.getItem('token');
    }

    return (
        <header>
            {renderHeader()}
        </header>
    );
}

export default Header;
