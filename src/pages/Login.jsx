import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useTranslation} from 'react-i18next';
import {FcGoogle} from 'react-icons/fc';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';
import Button from '../components/Button';
import Authentication from '../components/auth/Authentication';

const Login = () => {
  const navigate = useNavigate();

  const {t} = useTranslation();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);
  const {isAuthenticated} = useSelector((state) => state.isAuthenticated);

  // const googleOAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  // const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  // const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  // const scope = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';

  // const generateGoogleAuthUrl = () => {
  //   const params = new URLSearchParams({
  //     client_id: clientId,
  //     redirect_uri: redirectUri,
  //     response_type: 'code',
  //     scope: scope,
  //     include_granted_scopes: 'true',
  //     access_type: 'offline',
  //   });
  //
  //   return `${googleOAuthUrl}?${params.toString()}`;
  // };

  const handleGoogleSignIn = () => {
    alert(t('feature_in_development'));
    // window.location.href = generateGoogleAuthUrl();
  };

  const dispatch = useDispatch();

  const {
    setIsVisibleSignInModal,
    setIsVisibleSignUpModal,
  } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const renderAuthButtons = () => {
    return (
      <>
        <Button
          text={t('sign_in_button')}
          onClick={() => setIsVisibleSignInModal(true)}
        />
        <br/>
        <Button
          text={t('sign_up_button')}
          onClick={() => setIsVisibleSignUpModal(true)}
        />
        <br/>
        <Authentication/>
      </>
    );
  };

  const renderPage = () => {
    return (
      <div className={'sign-in'}>
        <h1>{t('sign_in')}</h1>
        {renderAuthButtons()}
        <br/>
        <button
          className={`sign-in-button ${isDarkMode ? 'dark' : 'light'} ${localStorage.getItem('i18nextLng')}`}
          onClick={handleGoogleSignIn}
        >
          {<FcGoogle size={35}/>}
          <span>{t('sign_in_button_google')}</span>
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (localStorage.getItem('isAuthUser') || isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className={'container center'}>
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
};

export default Login;
