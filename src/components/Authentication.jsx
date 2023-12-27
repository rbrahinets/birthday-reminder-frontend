import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Button from './Button';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import WaitModal from './WaitModal';

const Authentication = () => {
    const dispatch = useDispatch();
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showWaitModal, setShowWaitModal] = useState(false);

    const {isAuthenticated} = useSelector((state) => state.isAuthenticated);
    const {setIsAuthenticated} = bindActionCreators(
        actionCreators,
        dispatch
    );

    const render = () => {
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

    const handleShowSignInModal = () => {
        setShowSignInModal(true);
    }

    const handleHideSignInModal = () => {
        setShowSignInModal(false);
    }

    const handleSignInSuccess = () => {
        setIsAuthenticated(!isAuthenticated)
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

    return (
        <>
            {render()}
        </>
    )
}

export default Authentication;
