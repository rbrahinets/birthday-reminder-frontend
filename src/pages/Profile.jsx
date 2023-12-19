import React from 'react';
import {useNavigate} from 'react-router-dom';
import {baseUrl} from '../constants';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';

const PageNotFound = () => {
    const navigate = useNavigate();

    const renderProfile = () => {
        return (
            <>
                <h1>Profile</h1>
                <Button
                    text={'Sign Out'}
                    onClick={handleSignOut}
                />
            </>
        );
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate(`${baseUrl}/`);
    }

    return (
        <center className={'container'}>
            <Header/>
            <main>
                {renderProfile()}
            </main>
            <Footer/>
        </center>
    );
}

export default PageNotFound;
