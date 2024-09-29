import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useTranslation} from 'react-i18next';
import {actionCreators} from '../state';
import Header from '../components/Header';
import ProfileInfo from '../components/ProfileInfo';
import ProfileEdit from '../components/ProfileEdit';
import FirebaseImage from '../components/FirebaseImage';
import WaitModal from '../components/WaitModal';
import Settings from '../components/Settings';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import './../components/Button.css';

const Profile = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {loading} = useSelector((state) => state.loading);
  const {isProfileInfoMode} = useSelector((state) => state.isProfileInfoMode);
  const {currentUser} = useSelector((state) => state.currentUser);
  const {profileImage} = useSelector((state) => state.profileImage);
  const {previewProfileImage} = useSelector((state) => state.previewProfileImage);
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const {
    setCurrentUser,
    setLoading,
    setProfileImage,
    setPreviewProfileImage,
    setIsProfileInfoMode,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const fetchCurrentUserData = async () => {
    try {
      const response = await userService.findByEmail(
        localStorage.getItem('currentUserEmail')
      );
      setCurrentUser(response.data);

      if (
        response.data.imageUrl &&
        response.data.imageUrl.trim().length > 0
      ) {
        setProfileImage(response.data.imageUrl);
      } else {
        setProfileImage(process.env.PUBLIC_URL + '/add.png');
      }
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  }

  const renderPage = () => {
    return (
      <>
        <h1>{t('profile')}</h1>
        <h1>{t('info')}</h1>
        <FirebaseImage
          defaultImageUrl={`${process.env.PUBLIC_URL}/add.png`}
          object={currentUser}
          state={{
            firebaseImage: profileImage,
            previewFirebaseImage: previewProfileImage,
            setFirebaseImage: setProfileImage,
            setPreviewFirebaseImage: setPreviewProfileImage,
          }}
          service={userService}
          resetObject={fetchCurrentUserData}
        />
        {
          isProfileInfoMode ?
            <ProfileInfo updateProfileInfo={fetchCurrentUserData}/> :
            <ProfileEdit/>
        }
        <Settings/>
      </>
    );
  }

  useEffect(() => {
    setLoading(true);
    setIsProfileInfoMode(true);
    fetchCurrentUserData()
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

export default Profile;
