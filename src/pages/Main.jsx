import React, {useEffect} from 'react';
import {useSession} from '@supabase/auth-helpers-react';
import {useSelector} from 'react-redux';
import MainClickEffect from '../components/effects/MainClickEffect';
import MainImageEffect from '../components/effects/MainImageEffect';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Main.css';
import userService from '../services/UserService';

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
          src={'https://youtu.be/g4CZDWU7OgE'}
          allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
          allowFullScreen
          title={'Manual'}>
        </iframe>
      </>
    );
  };

  const createUser = async () => {
    const user = session?.user;
    if (!user) return;

    let savedUser;
    try {
      savedUser = await userService.findByEmail(user.email);
    } catch (error) {
    }
    console.log(savedUser);
    if (savedUser) return;

    const fullName = user.user_metadata.full_name.split(' ');
    const imageUrl = user.user_metadata.avatar_url.replace(/=s[^&]+/, '');

    await userService.save({
      firstName: fullName[0],
      lastName: fullName[1],
      email: user.email,
      imageUrl: imageUrl,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (session?.user && !localStorage.getItem('isAuthUser')) {
      createUser()
        .then(() => localStorage.setItem('isAuthUser', 'true'))
        .catch((error) => console.log(error));
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
