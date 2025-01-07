import React from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FcGoogle} from 'react-icons/fc';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const googleOAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const scope = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';

  const generateGoogleAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope,
      include_granted_scopes: 'true',
      access_type: 'offline',
    });

    return `${googleOAuthUrl}?${params.toString()}`;
  };

  const handleSignIn = () => {
    window.location.href = generateGoogleAuthUrl();
  };

  const renderPage = () => {
    return (
      <div className={'sign-in'}>
        <h1>{t('sign_in')}</h1>
        <button
          className={`sign-in-button ${isDarkMode ? 'dark' : 'light'} ${localStorage.getItem('i18nextLng')}`}
          onClick={handleSignIn}
        >
          {<FcGoogle size={35}/>}
          <span>{t('sign_in_button')}</span>
        </button>
      </div>
    );
  };

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
