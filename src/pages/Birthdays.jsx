import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Photo from '../components/Photo';
import WaitModal from '../components/WaitModal';
import Footer from '../components/Footer';
import birthdayService from '../services/BirthdayService';
import './Birthdays.css';
import {useTranslation} from "react-i18next";

const Birthdays = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {loading} = useSelector((state) => state.loading);
  const {birthdays} = useSelector((state) => state.birthdays);

  const {
    setBirthdays,
    setLoading,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const getBirthdays = () => {
    return (
      <>
        {birthdays.map((birthday) => (
            <div key={birthday._id}>
              <Link
                to={`/birthdays/birthday?birthdayId=${birthday._id}`}
                className={'birthday-link'}
              >
                <div className={'birthday-container'}>
                  <Photo
                    src={getSourceOfPhoto(birthday.imageUrl)}
                    alt={'birthday'}
                  />
                  <div className={'title-container'}>
                    {birthday.firstName}
                    <br/>
                    {birthday.lastName}
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </>
    )
  }

  const getSourceOfPhoto = (url) => {
    if (url && url.length > 0) {
      return url;
    }

    return process.env.PUBLIC_URL + '/homer-simpson.png';
  }

  const renderPage = () => {
    return (
      <>
        <h1>{t('birthdays')}</h1>
        <div className={'birthdays-list'}>
          {getBirthdays()}
          <Link
            to={`/new-birthday`}
            className={'add-new-birthday'}
          >
            <Photo
              src={`${process.env.PUBLIC_URL}/add.png`}
              alt={'add-new-birthday'}
            />
          </Link>
        </div>
      </>
    );
  }

  const fetchBirthdaysData = async (email) => {
    try {
      const response = await birthdayService.getBirthdaysForUserByEmail(email);
      setBirthdays(response.data);
    } catch (error) {
      console.error('Error fetching birthdays data:', error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchBirthdaysData(localStorage.getItem('currentUserEmail')).then(() => setLoading(false));
  }, []);

  return (
    <div className={'container center'}>
      <WaitModal
        show={loading}
      />
      <Header/>
      <main>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
}

export default Birthdays;
