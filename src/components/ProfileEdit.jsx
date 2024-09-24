import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TfiSave} from 'react-icons/tfi';
import {actionCreators} from '../state';
import Input from './Input';
import Button from './Button';
import userService from '../services/UserService';

const ProfileEdit = () => {
  const dispatch = useDispatch();

  const {currentUser} = useSelector((state) => state.currentUser);
  const {errorMessages} = useSelector((state) => state.errorMessages);

  const {
    setErrorMessages,
    setIsProfileInfoMode,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const errors = {
    firstName: 'Invalid First Name',
    lastName: 'Invalid Last Name',
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={'error'}>{errorMessages.message}</div>
    );

  const resetErrorMessages = () => {
    setErrorMessages({});
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

        setIsProfileInfoMode(true);
      } catch (error) {
        console.error('Updating Profile Failed', error);
      }
    }
  }

  const handleCancel = async () => {
    setErrorMessages({});
    setIsProfileInfoMode(true);
  }

  return (
    <div>
      <form className={'form'}>
        <Input
          type={'text'}
          name={'firstName'}
          id={'firstName'}
          placeholder={'First Name'}
          error={renderErrorMessage('firstName')}
          onClick={resetErrorMessages}
          defaultValue={currentUser.firstName}
        />
        <Input
          type={'text'}
          name={'lastName'}
          id={'lastName'}
          placeholder={'Last Name'}
          error={renderErrorMessage('lastName')}
          onClick={resetErrorMessages}
          defaultValue={currentUser.lastName}
        />
      </form>
      <Button
        text={'Save'}
        onClick={handleSave}
        IconTag={TfiSave}
      />
      <br/>
      <Button
        text={'Cancel'}
        onClick={handleCancel}
      />
    </div>
  );
}

export default ProfileEdit;