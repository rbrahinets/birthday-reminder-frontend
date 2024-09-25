import React from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
import {useTranslation} from "react-i18next";

const PageNotFound = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleMainClick = () => {
    navigate(`/`);
  }

  return (
    <div className={'container center'}>
      <Header/>
      <main>
        <h1>{t('oops')}</h1>
        <h2>{t('page_not_found')}</h2>
        <Button text={t('main')} onClick={handleMainClick}/>
      </main>
      <Footer/>
    </div>
  );
}

export default PageNotFound;
