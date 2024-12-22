import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSession, useSessionContext} from '@supabase/auth-helpers-react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Photo from '../components/Photo';
import WaitModal from '../components/WaitModal';
import Footer from '../components/Footer';
import birthdayService from '../services/BirthdayService';
import './Birthdays.css';

const Birthdays = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const session = useSession();

  const {birthdays} = useSelector((state) => state.birthdays);
  const {isDarkMode} = useSelector((state) => state.isDarkMode);
  const {query} = useSelector((state) => state.query);

  const {isLoading} = useSessionContext();
  const [loading, setLoading] = useState(true);

  const {
    setBirthdays,
    setQuery,
  } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const renderPage = () => {
    return (
      <>
        <h1>{t('birthdays')}</h1>
        <SearchBar/>
        <div className={'birthdays-list'}>
          {getBirthdays()}
          <Link
            to={`/new-birthday`}
            className={'add-new-birthday'}
          >
            <Photo
              src={`${process.env.PUBLIC_URL}/add.png`}
              alt={'add-new-birthday'}
            />
          </Link>
        </div>
      </>
    );
  };

  const getBirthdays = () => {
    const filteredBirthdays = getFilteredBirthdays(query, birthdays);

    return (
      <>
        {filteredBirthdays.map((birthday) => (
          <div key={birthday._id}>
            <Link
              to={`/birthdays/birthday?birthdayId=${birthday._id}`}
              className={'birthday-link'}
            >
              <div className={'birthday-container'}>
                <Photo
                  src={getSourceOfPhoto(birthday.imageUrl)}
                  alt={'birthday'}
                />
                <div
                  className={`title-container background-${isDarkMode ? 'dark' : 'light'}`}
                >
                  {birthday.firstName}
                  <br/>
                  {birthday.lastName}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </>
    );
  };

  const getSourceOfPhoto = (url) => {
    if (url && url.length > 0) {
      return url;
    }

    return process.env.PUBLIC_URL + '/no-avatar.png';
  };

  const fetchBirthdaysData = async (email) => {
    const response = await birthdayService.getBirthdaysForUserByEmail(email);
    setBirthdays(response.data);
  };

  const getFilteredBirthdays = (query, birthdays) => {
    if (!query) {
      return birthdays;
    }

    const birthdayNames = birthdays.map(birthday => {
        return {
          ...birthday,
          name: `${birthday.firstName} ${birthday.lastName}`.toLowerCase(),
        };
      },
    );

    return birthdayNames.filter(
      (birthdayName) => birthdayName.name.includes(query.toLowerCase()),
    );
  };

  useEffect(() => {
    if (!localStorage.getItem('isAuthUser')) {
      navigate('/login');
      return;
    }

    if (!session?.user) {
      return;
    }

    const currentUserEmail = session?.user.email;

    fetchBirthdaysData(currentUserEmail)
      .then(
        () => {
          window.scrollTo(0, 0);
          setQuery('');
          setLoading(false);
        },
      )
      .catch(
        (e) => {
          console.error('There was an error while fetching current user data:', e);
        },
      );
  }, [session]);

  return (<>
    {(isLoading || loading) ?
      <WaitModal/>
      : <div className={'container center'}>
        <Header/>
        <main className={`background-${isDarkMode ? 'dark' : 'light'}`}>
          {renderPage()}
        </main>
        <Footer/>
      </div>}
  </>);
};

export default Birthdays;
