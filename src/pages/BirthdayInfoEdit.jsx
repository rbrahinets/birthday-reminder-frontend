import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import WaitModal from '../components/WaitModal';
import Footer from '../components/Footer';
import birthdayService from '../services/BirthdayService';
import '../components/Input.css';

const BirthdayInfoEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const birthdayId = queryParams.get('birthdayId');

    const {birthday} = useSelector((state) => state.birthday);
    const {errorMessages} = useSelector((state) => state.errorMessages);

    const {
        setBirthday,
        setErrorMessages,
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const setInfoAboutBirthday = async () => {
        try {
            const response = await birthdayService.findById(birthdayId);
            setBirthday(response.data);
        } catch (error) {
            console.error('Error fetching birthday data:', error);
        }
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={'error'}>{errorMessages.message}</div>
        );

    const renderBirthdayInfoEdit = () => {
        if (!birthday) {
            return;
        }

        return (
            <>
                <WaitModal
                    show={!birthday}
                />
                <h1>Edit Birthday Info</h1>
                <form className={'form'}>
                    <Input
                        type={'text'}
                        name={'firstName'}
                        id={'firstName'}
                        placeholder={'First Name'}
                        error={renderErrorMessage('firstName')}
                        defaultValue={birthday.firstName}
                    />
                    <Input
                        type={'text'}
                        name={'lastName'}
                        id={'lastName'}
                        placeholder={'Last Name'}
                        error={renderErrorMessage('lastName')}
                        defaultValue={birthday.lastName}
                    />
                    <Input
                        type={'text'}
                        name={'email'}
                        id={'email'}
                        placeholder={'Email'}
                        error={renderErrorMessage('email')}
                        defaultValue={birthday.email}
                    />
                    <Input
                        type={'date'}
                        name={'dateOfBirth'}
                        id={'dateOfBirth'}
                        error={renderErrorMessage('dateOfBirth')}
                    />
                </form>
                <Button
                    text={'Update'}
                    onClick={handleUpdate}
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

    const handleUpdate = async (event) => {
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

                await birthdayService.update(
                    birthdayId,
                    {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        dateOfBirth: dateOfBirth.value,
                        emailOfUser: emailOfUser,
                    }
                );

                navigate(`/birthdays/birthday?birthdayId=${birthdayId}`);
            } catch (error) {
                console.error('Updating Birthday Info Failed', error);
                alert('Updating Birthday Info Failed.');
            }
        }
    }

    const isValidEmail = (email) => {
        return email.includes('@') && !email.endsWith('@');
    }

    const handleCancel = async () => {
        navigate(`/birthdays/birthday?birthdayId=${birthdayId}`);
    }

    useEffect(() => {
        setInfoAboutBirthday().then();
    }, []);

    return (
        <div className={'container center'}>
            <Header/>
            <main>
                {renderBirthdayInfoEdit()}
            </main>
            <Footer/>
        </div>
    );
}

export default BirthdayInfoEdit;
