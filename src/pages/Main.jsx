import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import WaitModal from '../components/WaitModal';
import Footer from '../components/Footer';

const Main = () => {
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showWaitModal, setShowWaitModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const renderMainForUnauthenticatedUser = () => {
        return (
            <>
                <Button
                    text={'Sign In'}
                    onClick={handleShowSignInModal}
                />
                <br/>
                <Button
                    text={'Sign Up'}
                    onClick={handleShowSignUpModal}
                />
                <SignInModal
                    show={showSignInModal}
                    onHide={handleHideSignInModal}
                    onShowWaitModal={handleShowWaitModal}
                    onHideWaitModal={handleHideWaitModal}
                    onShowSignUpModal={handleShowSignUpModal}
                    onSignInSuccess={handleSignInSuccess}
                />
                <SignUpModal
                    show={showSignUpModal}
                    onHide={handleHideSignUpModal}
                    onShowWaitModal={handleShowWaitModal}
                    onHideWaitModal={handleHideWaitModal}
                    onShowSignInModal={handleShowSignInModal}
                />
                <WaitModal
                    show={showWaitModal}
                />
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

    const handleShowSignInModal = () => {
        setShowSignInModal(true);
    }

    const handleHideSignInModal = () => {
        setShowSignInModal(false);
    }

    const handleSignInSuccess = (isSignInSuccess) => {
        setIsAuthenticated(isSignInSuccess);
    }

    const handleShowSignUpModal = () => {
        setShowSignUpModal(true);
    }

    const handleHideSignUpModal = () => {
        setShowSignUpModal(false);
    }

    const handleShowWaitModal = () => {
        setShowWaitModal(true);
    }

    const handleHideWaitModal = () => {
        setShowWaitModal(false);
    }

    const isTokenExist = () => {
        return !!localStorage.getItem('token');
    }

    useEffect(() => {
        setIsAuthenticated(isTokenExist);
    }, []);

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
