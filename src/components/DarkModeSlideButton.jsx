import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import './DarkModeSlideButton.css';

const DarkModeSlideButton = () => {
  const dispatch = useDispatch();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const {setIsDarkMode} = bindActionCreators(actionCreators, dispatch);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div className={'mode-toggle'}>
      <span role={'img'} aria-label={'sun'}>☀️</span>
      <label className={'switch'}>
        <input type={'checkbox'} checked={isDarkMode} onChange={toggleMode}/>
        <span className={'slider'}></span>
      </label>
      <span role={'img'} aria-label={'moon'}>🌙</span>
    </div>
  );
};

export default DarkModeSlideButton;
