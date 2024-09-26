import React from 'react';
import {useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';

const Login = () => {
  const {loginWithRedirect} = useAuth0();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  loginWithRedirect().then();

  return (
    <div
      className={`background-${isDarkMode ? 'dark' : 'light'}`}
    >
      Redirecting...
    </div>
  )
}

export default Login;
