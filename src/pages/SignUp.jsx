import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import userService from '../services/UserService';
import { baseUrl } from '../constants';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Footer from '../components/Footer';

const SingUp = () => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});

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
    };

    const isValidEmail = (email) => {
        return email.includes('@') && email.endsWith('.com');
    };

    const handleSingUpClick = (event) => {
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
                userService.save({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value,
                });
                navigate(`${baseUrl}/sign-in`);
            } catch (error) {
                console.error('Sign-Up Failed', error);
            }
        }
    };

    return (
        <>
            <center>
                <Header />
                <h1>Sign Up</h1>
                {renderForm}
                <Button text={'Sign Up'} onClick={handleSingUpClick} />
                <Footer />
            </center>
        </>
    );
};

export default SingUp;
