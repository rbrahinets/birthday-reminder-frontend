import React from 'react';
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FcGoogle} from 'react-icons/fc';
import Header from '../components/Header';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import './Login.css';

const Login = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);
  const session = useSession();
  const supabase = useSupabaseClient();

  const getUserByEmail = async (email) => {
    return await userService.findByEmail(email);
  };

  const createUser = async () => {
    const user = session?.user;
    if (!user) return;

    const savedUser = await getUserByEmail(user.email);
    if (savedUser) return;

    const names = user.email.split('@')[0].split('.');
    const firstName = names[0];
    const lastName = names.length > 1 ? names[1] : names[0];

    await userService.save({
      firstName: firstName,
      lastName: lastName,
      email: user.email,
    });
  };

  const handleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scope: 'https://www.googleapis.com/auth/calendar',
          redirectTo: process.env.REACT_APP_SUPABASE_REDIRECT_URI,
        },
      });

      await createUser();
    } catch (error) {
      console.log(error);
    }
  };

  const renderPage = () => {
    return (
      <div className={'sign-in'}>
        <h1>{t('sign_in')}</h1>
        <button
          className={`sign-in-button ${isDarkMode ? 'dark' : 'light'} ${localStorage.getItem('i18nextLng')}`}
          onClick={handleSignIn}
        >
          {<FcGoogle size={35}/>}
          <span>{t('sign_in_button')}</span>
        </button>
      </div>
    );
  };

  return (
    <div className={'container center'}>
      <Header/>
      <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
};

export default Login;
