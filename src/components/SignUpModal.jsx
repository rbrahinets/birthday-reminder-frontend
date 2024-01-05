import React from 'react';
import {Modal} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Button from './Button';
import Input from './Input';
import userService from '../services/UserService';

const SignUpModal = ({
                         show,
                         onHide,
                         onShowWaitModal,
                         onHideWaitModal,
                         onShowSignInModal
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
                name={'firstName'}
                id={'firstName'}
                placeholder={'First Name'}
                error={renderErrorMessage('firstName')}
            />
            <Input
                type={'text'}
                name={'lastName'}
                id={'lastName'}
                placeholder={'Last Name'}
                error={renderErrorMessage('lastName')}
            />
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
            <Input
                type={'password'}
                name={'confirmPassword'}
                id={'confirmPassword'}
                placeholder={'Confirm Password'}
                error={renderErrorMessage('confirmPassword')}
            />
        </form>
    );

    const errors = {
        firstName: 'Invalid First Name',
        lastName: 'Invalid Last Name',
        email: 'Invalid Email',
        password: 'Invalid Password',
        confirmPassword: 'Invalid Confirm Password',
    }

    const isValidEmail = (email) => {
        return email.includes('@') && email.endsWith('.com');
    }

    const handleSignUp = async (event) => {
        event.preventDefault();

        let {firstName, lastName, email, password, confirmPassword} =
            document.forms[0];
        let isValidInputtedData = false;

        if (!firstName.value || !firstName.value.trim().length) {
            setErrorMessages({
                name: 'firstName',
                message: errors.firstName,
            });
        } else if (!lastName.value || !lastName.value.trim().length) {
            setErrorMessages({
                name: 'lastName',
                message: errors.lastName,
            });
        } else if (
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
        } else if (
            !confirmPassword.value ||
            !confirmPassword.value.trim().length ||
            !(confirmPassword.value === password.value)
        ) {
            setErrorMessages({
                name: 'confirmPassword',
                message: errors.confirmPassword,
            });
        } else {
            isValidInputtedData = true;
        }

        if (isValidInputtedData) {
            try {
                onHide();
                onShowWaitModal();
                await userService.save({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value,
                });
                onShowSignInModal();
            } catch (error) {
                console.error('Sign-Up Failed', error);
                alert('Sign Up Failed. The e-mail you entered already exist!.');
            } finally {
                onHideWaitModal();
            }
        }
    }

    const handleClose = () => {
        onHide();
    }

    const handleSignIn = () => {
        onHide();
        onShowSignInModal();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName={'modal-sign-up'}
        >
            <div
                onClick={handleClose}
                className={'close'}
            >
                X
            </div>
            <center>
                <h1>Sign up</h1>
                {renderForm}
                <Button
                    text={'Create account'}
                    onClick={handleSignUp}
                />
                <hr/>
                <div
                    onClick={handleSignIn}
                    className={'modal-link'}
                >
                    Log in
                </div>
            </center>
        </Modal>
    );
}

export default SignUpModal;
