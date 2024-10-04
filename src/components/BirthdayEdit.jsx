import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {TfiSave} from 'react-icons/tfi';
import {actionCreators} from '../state';
import Input from './Input';
import Button from './Button';
import {useLocation} from "react-router-dom";
import birthdayService from "../services/BirthdayService";
import WaitModal from "./WaitModal";

const BirthdayEdit = () => {
  const dispatch = useDispatch();
  const {search} = useLocation();
  const {t} = useTranslation();

  const queryParams = new URLSearchParams(search);
  const birthdayId = queryParams.get('birthdayId');

  const {birthday} = useSelector((state) => state.birthday);
  const {errorMessages} = useSelector((state) => state.errorMessages);

  const {
    setErrorMessages,
    setIsBirthdayInfoMode,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const errors = {
    firstName: t('invalid_first_name'),
    lastName: t('invalid_last_name'),
    email: t('invalid_email'),
    dateOfBirth: t('invalid_date_of_birth'),
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={'error'}>{errorMessages.message}</div>
    );

  const resetErrorMessages = () => {
    setErrorMessages({});
  }

  const renderBirthdayInfoEdit = () => {
    if (!birthday) {
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const currentDay = currentDate.getUTCDate().toString().padStart(2, '0');
    const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    const dateOfBirth = birthday.dateOfBirth.split('T')[0];
    const date = dateOfBirth.split('-');
    const dateOfBirthYear = date[0];
    const dateOfBirthMonth = date[1];
    const dateOfBirthDay = date[2];
    const formattedDateOfBirth = `${dateOfBirthYear}-${dateOfBirthMonth}-${dateOfBirthDay}`;

    return (
      <>
        <WaitModal
          show={!birthday}
        />
        <h1>{t('edit_birthday_info')}</h1>
        <form className={'form'}>
          <Input
            type={'text'}
            name={'firstName'}
            id={'firstName'}
            placeholder={t('first_name')}
            error={renderErrorMessage('firstName')}
            onClick={resetErrorMessages}
            defaultValue={birthday.firstName}
          />
          <Input
            type={'text'}
            name={'lastName'}
            id={'lastName'}
            placeholder={t('last_name')}
            error={renderErrorMessage('lastName')}
            onClick={resetErrorMessages}
            defaultValue={birthday.lastName}
          />
          <Input
            type={'text'}
            name={'email'}
            id={'email'}
            placeholder={t('email')}
            error={renderErrorMessage('email')}
            onClick={resetErrorMessages}
            defaultValue={birthday.email}
          />
          <Input
            type={'date'}
            name={'dateOfBirth'}
            id={'dateOfBirth'}
            error={renderErrorMessage('dateOfBirth')}
            onClick={resetErrorMessages}
            defaultValue={formattedDateOfBirth}
            min={'1900-01-01'}
            max={formattedCurrentDate}
          />
        </form>
        <Button
          text={t('save')}
          onClick={handleSave}
          IconTag={TfiSave}
        />
        <br/>
        <Button
          text={t('cancel')}
          onClick={handleCancel}
        />
      </>
    );
  }

  const handleSave = async (event) => {
    event.preventDefault();

    let {firstName, lastName, email, dateOfBirth} = document.forms[0];
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

        setIsBirthdayInfoMode(true);
      } catch (error) {
        console.error('Updating Birthday Info Failed', error);
        alert(t('updating_birthday_info_failed'));
      }
    }
  }

  const isValidEmail = (email) => {
    return email.includes('@') && !email.endsWith('@');
  }

  const handleCancel = async () => {
    resetErrorMessages();
    setIsBirthdayInfoMode(true);
  }

  return (
    <div>
      {renderBirthdayInfoEdit()}
    </div>
  );
}

export default BirthdayEdit;