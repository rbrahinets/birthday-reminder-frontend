import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {CgProfile} from 'react-icons/cg';
import LinkButton from './LinkButton';
import './Header.css';
import './LanguageSelector.css'

const Header = () => {
  const {t} = useTranslation();

  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const renderLinks = () => (
    <>
      <LinkButton
        text={t('birthdays')}
        uri={'/birthdays'}
      />
      <LinkButton
        text={t('profile')}
        uri={'/profile'}
        Icon={CgProfile}
      />
      <a
        href={'#footer'}
        className={`link link-${isDarkMode ? 'dark' : 'light'}`}
      >
        {t('contacts')}
      </a>
    </>
  );

  const renderHeader = () => {
    return (
      <>
        <div>
          <Link
            to={`/`}
            className={'link'}
          >
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt={'logo'}
            />
          </Link>
        </div>
        <div className={'link-container'}>
          {renderLinks()}
        </div>
      </>
    );
  }

  return (
    <header className={`${isDarkMode ? 'dark' : 'light'}-header`}>
      {renderHeader()}
    </header>
  );
}

export default Header;
