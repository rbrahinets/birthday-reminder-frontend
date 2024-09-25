import React from 'react';
import {VscSignOut} from 'react-icons/vsc';
import {useAuth0} from '@auth0/auth0-react';
import {useTranslation} from 'react-i18next';

const LogoutButton = () => {
  const {logout} = useAuth0();
  const {t} = useTranslation();

  return (<button
    className="logout-button"
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
  </button>)
}

export default LogoutButton;
