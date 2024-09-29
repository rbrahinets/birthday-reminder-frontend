import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import WaitModal from '../components/WaitModal';
import FirebaseImage from '../components/FirebaseImage';
import BirthdayInfo from '../components/BirthdayInfo';
import BirthdayEdit from '../components/BirthdayEdit';
import Footer from '../components/Footer';
import birthdayService from '../services/BirthdayService';

const Birthday = () => {
  const dispatch = useDispatch();
  const {search} = useLocation();
  const {t} = useTranslation();

  const queryParams = new URLSearchParams(search);
  const birthdayId = queryParams.get('birthdayId');

  const {loading} = useSelector((state) => state.loading);
  const {isBirthdayInfoMode} = useSelector((state) => state.isBirthdayInfoMode);
  const {birthday} = useSelector((state) => state.birthday);
  const {birthdayImage} = useSelector((state) => state.birthdayImage);
  const {previewBirthdayImage} = useSelector((state) => state.previewBirthdayImage);
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const {
    setLoading,
    setBirthday,
    setBirthdayImage,
    setPreviewBirthdayImage,
    setIsBirthdayInfoMode,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const fetchBirthdayData = async () => {
    try {
      const response = await birthdayService.findById(birthdayId);
      setBirthday(response.data);

      if (
        response.data.imageUrl &&
        response.data.imageUrl.trim().length > 0
      ) {
        setBirthdayImage(response.data.imageUrl);
      } else {
        setBirthdayImage(process.env.PUBLIC_URL + '/no-avatar.png');
      }
    } catch (error) {
      console.error('Error fetching birthday data:', error);
    }
  }

  const renderPage = () => {
    return (
      <>
        <h1>{t('birthday_info')}</h1>
        <FirebaseImage
          defaultImageUrl={`${process.env.PUBLIC_URL}/no-avatar.png`}
          object={birthday}
          state={{
            firebaseImage: birthdayImage,
            previewFirebaseImage: previewBirthdayImage,
            setFirebaseImage: setBirthdayImage,
            setPreviewFirebaseImage: setPreviewBirthdayImage,
          }}
          service={birthdayService}
          resetObject={fetchBirthdayData}
        />
        {
          isBirthdayInfoMode ?
            <BirthdayInfo updateBirthdayInfo={fetchBirthdayData}/> :
            <BirthdayEdit/>
        }
      </>
    )
  }

  useEffect(() => {
    setLoading(true);
    setIsBirthdayInfoMode(true);
    fetchBirthdayData()
      .then(
        () => {
          setLoading(false);
          window.scrollTo(0, 0);
        }
      );
  }, []);

  return (
    <div className={'container center'}>
      <WaitModal
        show={loading}
      />
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
}

export default Birthday;
