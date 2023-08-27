import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import userService from '../services/UserService';

const SignIn = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const renderForm = (
        <div className="form">
            <form className="form">
                <div className="formcontrol">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                    />
                    {renderErrorMessage('email')}
                </div>
                <div className="formcontrol">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        required
                    />
                    {renderErrorMessage('password')}
                </div>
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
                navigate('/');
            } catch (error) {
                console.error('Sign-In Failed', error);
            }
        }
    };

    const handleSingUpClick = () => {
        navigate('/sign-up');
    };

    return (
        <>
            <div className="center">
                <h1>Sign In</h1>
                {renderForm}
                <button className="button" onClick={handleSingInClick}>
                    Sign In
                </button>
                <br />
                <button className="button" onClick={handleSingUpClick}>
                    Sign Up
                </button>
            </div>
        </>
    );
};

export default SignIn;
