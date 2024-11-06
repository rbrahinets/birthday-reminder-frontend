import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FaSearch} from 'react-icons/fa';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {query} = useSelector((state) => state.query);

  const {
    setQuery,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleInput = (value) => {
    setQuery(value);
  }

  return (
    <div className={'search-bar-container'}>
      <div className={'input-wrapper'}>
        <FaSearch id={'search-icon'}/>
        <input
          placeholder={t('search')}
          value={query}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
