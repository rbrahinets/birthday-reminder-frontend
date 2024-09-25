import React from 'react';
import {useTranslation} from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import DarkModeSlideButton from './DarkModeSlideButton';
import LogoutButton from './LogoutButton';
import './Settings.css';

const Settings = () => {
  const {t} = useTranslation();

  return (
    <div className={'settings-container'}>
      <h1>{t('settings')}</h1>
      <div className={'mode'}>
        <h3>{t('dark_mode')}</h3>
        <DarkModeSlideButton/>
      </div>
      <div className={'language'}>
        <h3>{t('language')}</h3>
        <LanguageSelector/>
      </div>
      <LogoutButton/>
    </div>
  );
}

export default Settings;
