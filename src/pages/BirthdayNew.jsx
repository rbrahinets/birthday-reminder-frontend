import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
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

    const currentUserEmail = localStorage.getItem('currentUserEmail');

    let {firstName, lastName, dateOfBirth} = document.forms[0];
    let isValidInputtedData = true;

    isValidInputtedData &= validateField(firstName, errors.firstName);
    isValidInputtedData &= validateField(lastName, errors.lastName);
    isValidInputtedData &= validateField(dateOfBirth, errors.dateOfBirth);

    if (isValidInputtedData) {
      try {
        await birthdayService.save({
          firstName: firstName.value,
          lastName: lastName.value,
          dateOfBirth: dateOfBirth.value,
          emailOfUser: currentUserEmail,
        });

        // await createGoogleCalendarEvent(`${firstName.value} ${lastName.value}`, dateOfBirth.value);

        navigate(`/birthdays`);
      } catch (error) {
        console.error('Adding New Birthday Failed', error);
        alert(t('adding_new_birthday_failed'));
      }
    }
  };

  const handleCancel = async () => {
    navigate(`/birthdays`);
  };

  // const createGoogleCalendarEvent = async (name, date) => {
  //   const currentYear = new Date().getFullYear();
  //   const [year, month, day] = date.split('-');
  //
  //   const eventDates = [];
  //   for (let i = 0; i < 5; i++) {
  //     const newDate = new Date(currentYear + i, month - 1, day);
  //     eventDates.push(newDate);
  //   }
  //
  //   for (const eventDate of eventDates) {
  //     const startDateTime = eventDate.toISOString();
  //     const endDateTime = new Date(eventDate.getTime() + 60 * 60 * 1000).toISOString();
  //     console.log({startDateTime, endDateTime});
  //
  //     const event = {
  //       'summary': t('birthday'),
  //       'description': `${t('reminder')} ${name}`,
  //       'start': {
  //         'dateTime': startDateTime,
  //         'timeZone': 'UTC',
  //       },
  //       'end': {
  //         'dateTime': endDateTime,
  //         'timeZone': 'UTC',
  //       },
  //     };
  //
  //     const accessToken = localStorage.getItem('access_token');
  //     if (accessToken) {
  //       await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(event),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.error) {
  //             console.error('Error creating event:', data.error);
  //           } else {
  //             console.log('Event created:', data);
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Request failed:', error);
  //         });
  //     } else {
  //       console.error('No access token available');
  //     }
  //   }
  // };

  useEffect(() => {
    if (!localStorage.getItem('isAuthUser')) {
      navigate('/login');
    }
  }, []);

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
