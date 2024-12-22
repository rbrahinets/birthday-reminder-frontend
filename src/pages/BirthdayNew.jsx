import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSession} from '@supabase/auth-helpers-react';
import {TiUserAdd} from 'react-icons/ti';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import Footer from '../components/Footer';
import birthdayService from '../services/BirthdayService';
import '../components/Input.css';

const BirthdayNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const session = useSession();

  const {errorMessages} = useSelector((state) => state.errorMessages);
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const {setErrorMessages} = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className={'error'}>{errorMessages.message}</div>
    );

  const renderNewBirthday = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    return (
      <div className={'edit-container'}>
        <h1>{t('new_birthday')}</h1>
        <form className={'form'}>
          <Input
            type={'text'}
            name={'firstName'}
            id={'firstName'}
            placeholder={t('first_name')}
            error={renderErrorMessage('firstName')}
          />
          <Input
            type={'text'}
            name={'lastName'}
            id={'lastName'}
            placeholder={t('last_name')}
            error={renderErrorMessage('lastName')}
          />
          <Input
            type={'text'}
            name={'email'}
            id={'email'}
            placeholder={t('email')}
            error={renderErrorMessage('email')}
          />
          <Input
            type={'date'}
            name={'dateOfBirth'}
            id={'dateOfBirth'}
            error={renderErrorMessage('dateOfBirth')}
            defaultValue={formattedDate}
            min={'1900-01-01'}
            max={formattedDate}
          />
        </form>
        <Button
          text={t('add')}
          onClick={handleAdd}
          IconTag={TiUserAdd}
        />
        <br/>
        <Button
          text={t('cancel')}
          onClick={handleCancel}
        />
      </div>
    );
  };

  const errors = {
    firstName: t('invalid_first_name'),
    lastName: t('invalid_last_name'),
    email: t('invalid_email'),
    dateOfBirth: t('invalid_date_of_birth'),
  };

  const validateField = (field, errorMessage) => {
    if (!field.value || !field.value.trim().length) {
      setErrorMessages({
        name: field.name,
        message: errorMessage,
      });
      return false;
    }
    return true;
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    const currentUserEmail = session.user.email;

    let {firstName, lastName, email, dateOfBirth} = document.forms[0];
    let isValidInputtedData = true;

    isValidInputtedData &= validateField(firstName, errors.firstName);
    isValidInputtedData &= validateField(lastName, errors.lastName);
    isValidInputtedData &= validateField(email, errors.email) && isValidEmail(email.value);
    isValidInputtedData &= validateField(dateOfBirth, errors.dateOfBirth);

    if (isValidInputtedData) {
      try {
        await birthdayService.save({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          dateOfBirth: dateOfBirth.value,
          emailOfUser: currentUserEmail,
        });

        navigate(`/birthdays`);
      } catch (error) {
        console.error('Adding New Birthday Failed', error);
        alert(t('adding_new_birthday_failed'));
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleCancel = async () => {
    navigate(`/birthdays`);
  };

  useEffect(() => {
    if (!localStorage.getItem('isAuthUser')) {
      navigate('/login');
      return;
    }

    if (!session?.user) {
      return;
    }
  }, [session]);

  return (
    <div className={'container center'}>
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        {renderNewBirthday()}
      </main>
      <Footer/>
    </div>
  );
};

export default BirthdayNew;
