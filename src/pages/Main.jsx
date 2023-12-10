import React, {useState} from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import SignInModal from '../components/SignInModal';
import Footer from '../components/Footer';

const Main = () => {
    const [showSignInModal, setShowSignInModal] = useState(false);

    const handleShowSignInModal = () => {
        setShowSignInModal(true);
    };

    const handleHideSignInModal = () => {
        setShowSignInModal(false);
    };

    return (
        <>
            <center className={'content'}>
                <Header/>
                <main>
                    <h1>hello friend</h1>
                    <Button
                        text={'Sign In'}
                        onClick={handleShowSignInModal}
                    />
                    <SignInModal
                        show={showSignInModal}
                        onHide={handleHideSignInModal}
                    />
                </main>
                <Footer className={'footer'}/>
            </center>
        </>
    );
};

export default Main;
