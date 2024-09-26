import React from 'react';
import {useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import {useTranslation} from 'react-i18next';
import {VscSignOut} from 'react-icons/vsc';
import './Button.css';

const LogoutButton = () => {
  const {logout} = useAuth0();
  const {t} = useTranslation();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  return (
    <button
      className={`button-${isDarkMode ? 'dark' : 'light'}`}
      onClick={() => {
        localStorage.removeItem('isSavedUser');
        localStorage.removeItem('currentUserEmail');
        logout({
          logoutParams: {
            returnTo: process.env.REACT_APP_AUTH_REDIRECT_URI,
          }
        }).then()
      }}
    >
    <span>
      {t('log_out')}
    </span>
      <VscSignOut size={20}/>
    </button>
  );
}

export default LogoutButton;
