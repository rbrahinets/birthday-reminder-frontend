import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Button from './Button';
import Input from './Input';
import userService from '../services/UserService';
import './Modal.css';

const SignInModal = ({
                         show,
                         onHide,
                         onShowWaitModal,
                         onHideWaitModal,
                         onShowSignUpModal,
                         onSignInSuccess
                     }) => {
    const dispatch = useDispatch();

    const {errorMessages} = useSelector((state) => state.errorMessages);

    const {setErrorMessages} = bindActionCreators(
        actionCreators,
        dispatch
    );

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={'error'}>{errorMessages.message}</div>
        );

    const renderForm = (
        <form>
            <Input
                type={'text'}
                name={'email'}
                id={'email'}
                placeholder={'Email'}
                error={renderErrorMessage('email')}
            />
            <Input
                type={'password'}
                name={'password'}
                id={'password'}
                placeholder={'Password'}
                error={renderErrorMessage('password')}
            />
        </form>
    );

    const errors = {
        email: 'Invalid Email',
        password: 'Invalid Password',
    }

    const isValidEmail = (email) => {
        return email.includes('@') && !email.endsWith('@');
    }

    const handleSignIn = async (event) => {
        event.preventDefault();

        let {email, password} = document.forms[0];
        let isValidInputtedData = false;

        if (
            !email.value ||
            !email.value.trim().length ||
            !isValidEmail(email.value)
        ) {
            setErrorMessages({
                name: 'email',
                message: errors.email,
            });
        } else if (!password.value || !password.value.trim().length) {
            setErrorMessages({
                name: 'password',
                message: errors.password,
            });
        } else {
            isValidInputtedData = true;
        }

        if (isValidInputtedData) {
            try {
                onHide();
                onShowWaitModal();
                const response = await userService.signIn({
                    email: email.value,
                    password: password.value,
                });
                const token = response.data.accessToken;
                localStorage.setItem('token', token);
                localStorage.setItem('currentUserEmail', email.value);
                onSignInSuccess();
            } catch (error) {
                console.error('Sign-In Failed', error);
                alert('Sign In Failed! The e-mail address or password you entered was incorrect.');
            } finally {
                onHideWaitModal();
            }
        }
    }

    const handleClose = () => {
        onHide();
    }

    const handleSignUp = () => {
        onHide();
        onShowSignUpModal();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName={'modal-sign-in'}
        >
            <div
                onClick={handleClose}
                className={'close'}
            >
                X
            </div>
            <div className={'center'}>
                <h1>Sign in</h1>
                {renderForm}
                <Button
                    text={'Sign in'}
                    onClick={handleSignIn}
                />
                <hr className={'separator'}/>
                <div
                    onClick={handleSignUp}
                    className={'modal-link'}
                >
                    Sign Up
                </div>
            </div>
        </Modal>
    );
}

export default SignInModal;
