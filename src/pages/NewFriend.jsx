import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Footer from '../components/Footer';
import friendService from '../services/FriendService';
import '../components/Input.css';

const NewFriend = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {errorMessages} = useSelector((state) => state.errorMessages);

    const {setErrorMessages} = bindActionCreators(
        actionCreators,
        dispatch
    );

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={'error'}>{errorMessages.message}</div>
        );

    const renderNewFriend = () => {
        return (
            <>
                <h1>New Friend</h1>
                <form className={'form'}>
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
                        type={'date'}
                        name={'dateOfBirth'}
                        id={'dateOfBirth'}
                        error={renderErrorMessage('dateOfBirth')}
                    />
                </form>
                <Button
                    text={'Add'}
                    onClick={handleAdd}
                />
                <br/>
                <Button
                    text={'Cancel'}
                    onClick={handleCancel}
                />
            </>
        );
    }

    const errors = {
        firstName: 'Invalid First Name',
        lastName: 'Invalid Last Name',
        email: 'Invalid Email',
        dateOfBirth: 'Invalid Date Of Birth',
    }

    const handleAdd = async (event) => {
        event.preventDefault();

        let {firstName, lastName, email, dateOfBirth} =
            document.forms[0];
        let isValidInputtedData = false;

        if (
            !firstName.value ||
            !firstName.value.trim().length
        ) {
            setErrorMessages({
                name: 'firstName',
                message: errors.firstName,
            });
        } else if (
            !lastName.value ||
            !lastName.value.trim().length
        ) {
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
        } else if (
            !dateOfBirth.value
        ) {
            setErrorMessages({
                name: 'dateOfBirth',
                message: errors.dateOfBirth,
            });
        } else {
            isValidInputtedData = true;
        }

        if (isValidInputtedData) {
            try {
                const emailOfUser = localStorage.getItem('currentUserEmail');

                await friendService.save({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    dateOfBirth: dateOfBirth.value,
                    emailOfUser: emailOfUser,
                });
                navigate(`/birthdays`);
            } catch (error) {
                console.error('Adding New Friend Failed', error);
                alert('Adding New Friend Failed. The e-mail you entered already exist!');
            }
        }
    }

    const isValidEmail = (email) => {
        return email.includes('@') && email.endsWith('.com');
    }

    const handleCancel = async () => {
        navigate(`/birthdays`);
    }

    return (
        <div className={'container center'}>
            <Header/>
            <main>
                {renderNewFriend()}
            </main>
            <Footer/>
        </div>
    );
}

export default NewFriend;
