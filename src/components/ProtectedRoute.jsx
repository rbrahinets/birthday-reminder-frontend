import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import WaitModal from './WaitModal';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth0();

  if (!isAuthenticated) {
    navigate('/login');
  }

  return isAuthenticated ? children : <WaitModal show={true}/>;
};

export default ProtectedRoute;
