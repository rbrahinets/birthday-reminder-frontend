import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import Button from './Button';
import Input from './Input';
import userService from '../services/UserService';


const SignInModal = ({show, onHide}) => {
    const [errorMessages, setErrorMessages] = useState({});

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
    };

    const isValidEmail = (email) => {
        return email.includes('@') && email.endsWith('.com');
    };

    const handleSignIn = async (event) => {
        alert('Please Wait...');

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
                const response = await userService.signIn({
                    email: email.value,
                    password: password.value,
                });
                const token = response.data.accessToken;
                localStorage.setItem('token', token);
                onHide();
            } catch (error) {
                console.error('Sign-In Failed', error);
                alert('Sign-In Failed! The e-mail address or password you entered was incorrect.');
            }
        }
    };

    const handleClose = () => {
        onHide();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
            >
                <div className={'modal-front'}>
                    <div
                        onClick={handleClose}
                        className={'close'}
                    >
                        X
                    </div>
                    <center>
                        <h1>Sign In</h1>
                        {renderForm}
                        <Button
                            text={'Sign In'}
                            onClick={handleSignIn}
                        />
                    </center>
                </div>
            </Modal>
        </>
    );
};

export default SignInModal;
