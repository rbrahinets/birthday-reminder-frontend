import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const dispatch = useDispatch();

  const {language} = useSelector((state) => state.language);

  const [expanded, setExpanded] = useState(false);

  const {
    setLanguage,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const toggleList = () => {
    setExpanded(!expanded);
  };

  const selectLanguage = (language) => {
    setLanguage(language);
    setExpanded(false);
    localStorage.setItem('language', language);
  };

  return (
    <div className="language-selector">
      <div className="selected-language" onClick={toggleList}>
        {language}
        <span className="arrow">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <ul className="language-options">
          <li onClick={() => selectLanguage('English')}>English</li>
          <li onClick={() => selectLanguage('Ukrainian')}>Ukrainian</li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
