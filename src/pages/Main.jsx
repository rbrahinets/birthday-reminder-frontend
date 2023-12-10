import React, {useState} from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import Footer from '../components/Footer';

const Main = () => {
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

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
                <Button
                    text={'Sign In'}
                    onClick={handleShowSignInModal}
                />
                <SignInModal
                    show={showSignInModal}
                    onHide={handleHideSignInModal}
                />
                <br/>
                <Button
                    text={'Sign Up'}
                    onClick={handleShowSignUpModal}
                />
                <SignUpModal
                    show={showSignUpModal}
                    onHide={handleHideSignUpModal}
                />
            </>
        )
    }

    return (
        <>
            <center className={'content'}>
                <Header/>
                <main>
                    <h1>hello friend</h1>
                    {!getToken() && renderHeaderForUnauthenticatedUser()}
                </main>
                <Footer className={'footer'}/>
            </center>
        </>
    );
};

export default Main;
