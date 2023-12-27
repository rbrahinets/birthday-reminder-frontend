import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import Authentication from '../components/Authentication';
import Footer from '../components/Footer';

const Main = () => {
    const {isAuthenticated} = useSelector((state) => state.isAuthenticated);

    const renderMainForUnauthenticatedUser = () => {
        return (
            <>
                <Authentication/>
            </>
        );
    }

    const renderMainForAuthenticatedUser = () => {
        return (
            <>
                <h1>User is authenticated</h1>
            </>
        );
    }

    return (
        <center className={'container'}>
            <Header/>
            <main>
                <h1>hello friend</h1>
                {
                    isAuthenticated
                        ? renderMainForAuthenticatedUser()
                        : renderMainForUnauthenticatedUser()
                }
            </main>
            <Footer/>
        </center>
    );
}

export default Main;
