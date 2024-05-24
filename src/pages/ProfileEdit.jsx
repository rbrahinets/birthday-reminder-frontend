import React, {useEffect} from 'react';
import {TfiSave} from 'react-icons/tfi';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Input from '../components/Input';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import '../components/Input.css';

const ProfileEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {currentUser} = useSelector((state) => state.currentUser);
    const {errorMessages} = useSelector((state) => state.errorMessages);

    const {
        setCurrentUser,
        setErrorMessages
    } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const setInfoAboutCurrentUser = async () => {
        try {
            const response = await userService.findByEmail(
                localStorage.getItem('currentUserEmail')
            );
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Error fetching current user data:', error);
        }
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={'error'}>{errorMessages.message}</div>
        );

    const renderEditProfile = () => {
        return (
            <>
                <h1>Edit Profile</h1>
                <form className={'form'}>
                    <Input
                        type={'text'}
                        name={'firstName'}
                        id={'firstName'}
                        placeholder={'First Name'}
                        error={renderErrorMessage('firstName')}
                        defaultValue={currentUser.firstName}
                    />
                    <Input
                        type={'text'}
                        name={'lastName'}
                        id={'lastName'}
                        placeholder={'Last Name'}
                        error={renderErrorMessage('lastName')}
                        defaultValue={currentUser.lastName}
                    />
                </form>
                <div
                    className={'button-container'}
                    onClick={handleSave}
                >
                    <span className={'title'}>Save</span>
                    <TfiSave
                        size={20}
                    />
                </div>
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
    }

    const handleSave = async (event) => {
        event.preventDefault();

        let {firstName, lastName} =
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
        } else {
            isValidInputtedData = true;
        }

        if (isValidInputtedData) {
            try {
                await userService.update(
                    currentUser._id,
                    {
                        firstName: firstName.value,
                        lastName: lastName.value,
                    }
                );
                navigate(`/profile`);
            } catch (error) {
                console.error('Updating Profile Failed', error);
            }
        }
    }

    const handleCancel = async () => {
        navigate(`/profile`);
    }

    useEffect(() => {
        setInfoAboutCurrentUser().then();
    }, []);

    return (
        <div className={'container center'}>
            <Header/>
            <main>
                {renderEditProfile()}
            </main>
            <Footer/>
        </div>
    );
}

export default ProfileEdit;
