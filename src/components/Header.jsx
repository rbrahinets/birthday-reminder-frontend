import React from 'react';
import {Link} from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
import LinkButton from './LinkButton';
import './Header.css';

const Header = () => {
  const renderLinks = () => (
    <>
      <LinkButton
        text={'Birthdays'}
        uri={'/birthdays'}
      />
      <LinkButton
        text={'Profile'}
        uri={'/profile'}
        Icon={CgProfile}
      />
      <a
        href={'#footer'}
        className={'link'}
      >
        Contacts
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
