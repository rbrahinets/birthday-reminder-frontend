import React, {useEffect} from 'react';
import {useSession} from '@supabase/auth-helpers-react';
import {useSelector} from 'react-redux';
import MainClickEffect from '../components/effects/MainClickEffect';
import MainImageEffect from '../components/effects/MainImageEffect';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Main.css';

const Main = () => {
  const {isDarkMode} = useSelector((state) => state.isDarkMode);
  const session = useSession();

  const renderPage = () => {
    return (
      <>
        <img
          src={process.env.PUBLIC_URL + '/main-image.png'}
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
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (session?.user && !localStorage.getItem('isAuthUser')) {
      localStorage.setItem('isAuthUser', 'true');
    }
  }, [session]);

  return (
    <div className={'container center'}>
      <MainClickEffect/>
      <MainImageEffect/>
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
};

export default Main;
