import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './LinkButton.css';

const LinkButton = ({text, uri, Icon}) => {
  const navigate = useNavigate();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const handleClick = () => {
    navigate(uri);
  };

  return (
    <div
      className={`link link-${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleClick}
    >
      {text}
      {Icon && (
        <Icon
          className={`profile-icon profile-icon-${isDarkMode ? 'dark' : 'light'}`}
        />
      )}
    </div>
  );
};

export default LinkButton;
