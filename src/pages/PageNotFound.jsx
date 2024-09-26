import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import './PageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  const handleMainClick = () => {
    navigate(`/`);
  }

  return (
    <div className={'container center'}>
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        <img
          src={`${process.env.PUBLIC_URL}/page-not-found-${isDarkMode ? 'dark' : 'light'}.png`}
          alt={'Page Not Found'}
          className={'page-not-found'}
        />
        <br/>
        <Button text={t('main')} onClick={handleMainClick}/>
      </main>
      <Footer/>
    </div>
  );
}

export default PageNotFound;
