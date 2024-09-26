import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import './LinkButton.css'

const LinkButton = ({text, uri, Icon}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();
  const navigate = useNavigate();

  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(uri);
    } else {
      loginWithRedirect().then();
    }
  }

  return (
    <div
      className={`link link-${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleClick}
    >
      {text}
      {Icon && <Icon
        className={`profile-icon profile-icon-${isDarkMode ? 'dark' : 'light'}`}
      />
      }
    </div>
  )
}

export default LinkButton;
