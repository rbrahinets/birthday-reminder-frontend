import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Main.css';

const Main = () => {
  const renderPage = () => {
    return (
      <>
        <img
          src={process.env.PUBLIC_URL + '/main_image.png'}
          alt={'main-image'}
          className={'main-image'}
        />
        <br/>
        <iframe
          src={'https://www.youtube.com/embed/Pu58Is_lIIw'}
          allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
          allowFullScreen
          title={'Manual'}>
        </iframe>
      </>
    );
  }

  return (
    <div className={'container center'}>
      <Header/>
      <main>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
}

export default Main;
