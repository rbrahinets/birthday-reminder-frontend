import React, {useEffect} from 'react';
import {TfiSave} from 'react-icons/tfi';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import WaitModal from '../components/WaitModal';
import Footer from '../components/Footer';
import birthdayService from '../services/BirthdayService';
import '../components/Input.css';

const BirthdayInfoEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {search} = useLocation();
  const {t} = useTranslation();
  const queryParams = new URLSearchParams(search);
  const birthdayId = queryParams.get('birthdayId');

  const {birthday} = useSelector((state) => state.birthday);
  const {errorMessages} = useSelector((state) => state.errorMessages);
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

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
            defaultValue={birthday.firstName}
          />
          <Input
            type={'text'}
            name={'lastName'}
            id={'lastName'}
            placeholder={t('last_name')}
            error={renderErrorMessage('lastName')}
            defaultValue={birthday.lastName}
          />
          <Input
            type={'text'}
            name={'email'}
            id={'email'}
            placeholder={t('email')}
            error={renderErrorMessage('email')}
            defaultValue={birthday.email}
          />
          <Input
            type={'date'}
            name={'dateOfBirth'}
            id={'dateOfBirth'}
            error={renderErrorMessage('dateOfBirth')}
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

  const errors = {
    firstName: t('invalid_first_name'),
    lastName: t('invalid_last_name'),
    email: t('invalid_email'),
    dateOfBirth: t('invalid_date_of_birth'),
  }

  const handleSave = async (event) => {
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
        alert(t('updating_birthday_info_failed'));
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
    setInfoAboutBirthday()
      .then(
        () => window.scrollTo(0, 0)
      );
  }, []);

  return (
    <div className={'container center'}>
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        {renderBirthdayInfoEdit()}
      </main>
      <Footer/>
    </div>
  );
}

export default BirthdayInfoEdit;
