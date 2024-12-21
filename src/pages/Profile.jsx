import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
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
  const navigate = useNavigate();
  const currentUserEmail = localStorage.getItem('currentUserEmail');

  const {isProfileInfoMode} = useSelector((state) => state.isProfileInfoMode);
  const {currentUser} = useSelector((state) => state.currentUser);
  const {profileImage} = useSelector((state) => state.profileImage);
  const {previewProfileImage} = useSelector((state) => state.previewProfileImage);
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const [loading, setLoading] = useState(true);

  const {
    setCurrentUser,
    setProfileImage,
    setPreviewProfileImage,
    setIsProfileInfoMode,
  } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const fetchCurrentUserData = async () => {
    try {
      const response = await userService.findByEmail(currentUserEmail);
      setCurrentUser(response.data);

      const getProfileImage = (imageUrl) => {
        return imageUrl && imageUrl.trim().length > 0
          ? imageUrl
          : `${process.env.PUBLIC_URL}/add.png`;
      };

      setProfileImage(getProfileImage(response.data.imageUrl));
    } catch (error) {
      console.error('Error fetching current currentUserEmail data:', error);
    }
  };

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
  };

  useEffect(() => {
    if (!currentUserEmail) {
      navigate('/login');
    }

    fetchCurrentUserData()
      .then(
        () => {
          window.scrollTo(0, 0);
          setIsProfileInfoMode(true);
          setLoading(false);
        },
      );
  }, []);

  return (<>
    {loading ?
      <WaitModal/>
      : <div className={'container center'}>
        <Header/>
        <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
          {renderPage()}
        </main>
        <Footer/>
      </div>}
  </>);
};

export default Profile;
