import React from 'react';
import {Link} from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
import LinkButton from './LinkButton';
import './Header.css';
import {useTranslation} from "react-i18next";

const Header = () => {
  const {t} = useTranslation();

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
        className={'link'}
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
    <header>
      {renderHeader()}
    </header>
  );
}

export default Header;
