import React from 'react';
import {useSupabaseClient} from '@supabase/auth-helpers-react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {VscSignOut} from 'react-icons/vsc';
import './Button.css';
import {useNavigate} from 'react-router-dom';

const LogoutButton = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {isDarkMode} = useSelector((state) => state.isDarkMode);
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAuthUser');
    navigate('/');
  };


  return (
    <button
      className={`button-${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleSignOut}
    >
    <span>
      {t('log_out')}
    </span>
      <VscSignOut size={20}/>
    </button>
  );
};

export default LogoutButton;
