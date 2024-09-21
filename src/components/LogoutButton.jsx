import React from 'react';
import {VscSignOut} from 'react-icons/vsc';
import {useAuth0} from '@auth0/auth0-react';

const LogoutButton = () => {
  const {logout} = useAuth0();

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
      Log Out
    </span>
    <VscSignOut size={20}/>
  </button>)
}

export default LogoutButton;
