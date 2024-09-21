import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import './LinkButton.css'

const LinkButton = ({text, uri, Icon}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(uri);
    } else {
      loginWithRedirect().then();
    }
  }

  return (
    <div className="link" onClick={handleClick}>
      {text}
      {Icon && <Icon className={'profile-icon'}/>}
    </div>
  )
}

export default LinkButton;
