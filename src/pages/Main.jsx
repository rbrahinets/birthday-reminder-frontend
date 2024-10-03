import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import './Main.css';

const Main = () => {
  const {user, isAuthenticated, isLoading} = useAuth0();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

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
  }

  const getUserByEmail = async () => {
    if (isAuthenticated) {
      try {
        localStorage.setItem('isSavedUser', 'true');
        localStorage.setItem('currentUserEmail', user.email);
        return await userService.findByEmail(user.email);
      } catch (error) {
        return undefined;
      }
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !isAuthenticated || localStorage.getItem('isSavedUser') === 'true') return;

      const savedUser = await getUserByEmail(user.email);
      if (!!savedUser) return;

      const [firstName, lastName] = user.nickname.split('.');

      try {
        await userService.save({
          firstName: firstName,
          lastName: lastName,
          email: user.email,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData().then();
  }, [user, isAuthenticated]);

  return (
    <div className={'container center'}>
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
}

export default Main;
