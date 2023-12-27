import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Authentication from '../components/Authentication';
import Footer from '../components/Footer';

const Main = () => {
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector((state) => state.isAuthenticated);

    const {
        setIsVisibleSignInModal,
        setIsVisibleSignUpModal,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

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
