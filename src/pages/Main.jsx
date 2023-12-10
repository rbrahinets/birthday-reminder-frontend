import React, {useState} from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import SignInModal from '../components/SignInModal';
import Footer from '../components/Footer';

const Main = () => {
    const [showSignInModal, setShowSignInModal] = useState(false);

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const handleShowSignInModal = () => {
        setShowSignInModal(true);
    };

    const handleHideSignInModal = () => {
        setShowSignInModal(false);
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
