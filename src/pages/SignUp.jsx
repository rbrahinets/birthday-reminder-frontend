import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/UserService';

const SingUp = () => {
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
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        required
                    />
                    {renderErrorMessage('firstName')}
                </div>
                <div className="formcontrol">
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        required
                    />
                    {renderErrorMessage('lastName')}
                </div>
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
                <div className="formcontrol">
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        required
                    />
                    {renderErrorMessage('confirmPassword')}
                </div>
            </form>
        </div>
    );

    const errors = {
        firstName: 'Invalid First Name',
        lastName: 'Invalid Last Name',
        email: 'Invalid Email',
        password: 'Invalid Password',
        confirmPassword: 'Invalid Confirm Password',
    };

    const isValidEmail = (email) => {
        return email.includes('@') && email.endsWith('.com');
    };

    const handleSingUpClick = async (event) => {
        event.preventDefault();

        let { firstName, lastName, email, password, confirmPassword } =
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
                await userService.save({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value,
                });
                navigate('/sign-in');
            } catch (error) {
                console.error('Sign-Up Failed', error);
            }
        }
    };

    const handleSingInClick = () => {
        navigate('/sign-in');
    };

    return (
        <>
            <div className="center">
                <h1>Sign Up</h1>
                {renderForm}
                <button className="button" onClick={handleSingUpClick}>
                    Sign Up
                </button>
                <br />
                <button className="button" onClick={handleSingInClick}>
                    Sign In
                </button>
            </div>
        </>
    );
};

export default SingUp;
