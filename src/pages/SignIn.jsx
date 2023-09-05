import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import userService from '../services/UserService';
import Input from '../components/Input';
import Button from '../components/Button';

const url = '/birthday-reminder-frontend';

const SignIn = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={'error'}>{errorMessages.message}</div>
        );

    const renderForm = (
        <div className={'form'}>
            <form className={'form'}>
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
        </div>
    );

    const errors = {
        email: 'Invalid Email',
        password: 'Invalid Password',
    };

    const isValidEmail = (email) => {
        return email.includes('@') && email.endsWith('.com');
    };

    const handleSingInClick = async (event) => {
        event.preventDefault();

        let { email, password } = document.forms[0];
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
                navigate(`${url}/`);
            } catch (error) {
                console.error('Sign-In Failed', error);
            }
        }
    };

    const handleSingUpClick = () => {
        navigate(`${url}/sign-up`);
    };

    return (
        <>
            <div className={'center'}>
                <h1>Sign In</h1>
                {renderForm}
                <Button text={'Sign In'} onClick={handleSingInClick} />
                <br />
                <Button text={'Sign Up'} onClick={handleSingUpClick} />
            </div>
        </>
    );
};

export default SignIn;
