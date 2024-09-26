import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const {i18n} = useTranslation();
  const {t} = useTranslation();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const currentLanguage = localStorage.getItem('i18nextLng');
  const languages = {
    en: t('english'),
    uk: t('ukrainian'),
  }

  const [expanded, setExpanded] = useState(false);

  const toggleList = () => {
    setExpanded(!expanded);
  }

  const handleSelectLanguage = (languageCode) => {
    setExpanded(false);
    i18n.changeLanguage(languageCode).then();
  }

  return (
    <div
      className={`language-selector background-${isDarkMode ? 'dark' : 'light'} border-${isDarkMode ? 'dark' : 'light'}`}
    >
      <div className={'selected-language'} onClick={toggleList}>
        {languages[currentLanguage]}
        <span className={'arrow'}>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <ul
          className={`language-options background-${isDarkMode ? 'dark' : 'light'} border-${isDarkMode ? 'dark' : 'light'}`}
        >
          {Object.entries(languages).map(([key, language]) => (
            <li
              key={key}
              onClick={() => handleSelectLanguage(key)}
            >
              {language}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
