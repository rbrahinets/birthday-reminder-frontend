import React from 'react';
import LanguageSelector from './LanguageSelector';
import LogoutButton from './LogoutButton';
import './Settings.css';
import DarkModeSlideButton from "./DarkModeSlideButton";

const Settings = () => (
  <div className={'settings-container'}>
    <h1>Settings</h1>
    <div className={'mode'}>
      <h3>Dark Mode</h3>
      <DarkModeSlideButton/>
    </div>
    <div className={'language'}>
      <h3>Language</h3>
      <LanguageSelector/>
    </div>
    <LogoutButton/>
  </div>
);

export default Settings;
