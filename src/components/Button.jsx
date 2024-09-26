import React from 'react';
import {useSelector} from 'react-redux';
import './Button.css';

const Button = ({text, onClick, IconTag}) => {
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  return (
    <button
      className={`button-${isDarkMode ? 'dark' : 'light'}`}
      onClick={onClick}
    >
      <span>{text}</span>
      {IconTag && <IconTag
        size={20}
      />}
    </button>
  );
}

export default Button;
