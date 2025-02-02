import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import MainClickEffect from '../components/effects/MainClickEffect';
import MainImageEffect from '../components/effects/MainImageEffect';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Main.css';
// import userService from '../services/UserService';

const Main = () => {
  const {isDarkMode} = useSelector((state) => state.isDarkMode);
  // const [user, setUser] = useState(null);


  // const handleRedirect = async () => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const code = urlParams.get('code');
  //   const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  //   const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  //   const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  //
  //   if (code) {
  //     try {
  //       const response = await fetch('https://oauth2.googleapis.com/token', {
  //         method: 'POST',
  //         body: new URLSearchParams({
  //           code: code,
  //           client_id: clientId,
  //           client_secret: clientSecret,
  //           redirect_uri: redirectUri,
  //           grant_type: 'authorization_code',
  //         }),
  //         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //       });
  //
  //       const data = await response.json();
  //
  //       if (data.access_token) {
  //         localStorage.setItem('access_token', data.access_token);
  //       }
  //
  //       const accessToken = localStorage.getItem('access_token');
  //       if (accessToken) {
  //         await fetchUserData(accessToken);
  //       }
  //     } catch (error) {
  //       console.error('Error during token exchange:', error);
  //     }
  //   }
  // };

  // const fetchUserData = async (accessToken) => {
  //   const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //
  //   const userData = await response.json();
  //   setUser(userData);
  //   localStorage.setItem('currentUserEmail', userData.email);
  // };

  // const createUser = async () => {
  //   if (!user) return;
  //
  //   let savedUser;
  //   try {
  //     savedUser = await userService.findByEmail(user.email);
  //   } catch (error) {
  //   }
  //
  //   if (savedUser) return;
  //
  //   const fullName = user.name.split(' ');
  //   const imageUrl = user.picture.replace(/=s[^&]+/, '');
  //
  //   await userService.save({
  //     firstName: fullName[0],
  //     lastName: fullName[1],
  //     email: user.email,
  //     imageUrl: imageUrl,
  //   });
  // };

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
          src={'https://www.youtube.com/embed/g4CZDWU7OgE'}
          allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
          allowFullScreen
          title={'Manual'}>
        </iframe>
      </>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // handleRedirect().then(() => {
    //   if (localStorage.getItem('access_token') && !localStorage.getItem('isAuthUser')) {
    //     createUser()
    //       .then(() => localStorage.setItem('isAuthUser', 'true'))
    //       .catch((error) => console.log(error));
    //   }
    // });
  }, []);

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
