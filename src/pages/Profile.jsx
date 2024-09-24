import React, {useEffect} from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import Button from '../components/Button';
import LogoutButton from '../components/LogoutButton';
import WaitModal from '../components/WaitModal';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import './../components/Button.css';
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading} = useSelector((state) => state.loading);

  const {
    setCurrentUser,
    setLoading,
    setProfileImage,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const fetchCurrentUserData = async () => {
    try {
      const response = await userService.findByEmail(
        localStorage.getItem('currentUserEmail')
      );
      setCurrentUser(response.data);

      if (
        response.data.imageUrl &&
        response.data.imageUrl.trim().length > 0
      ) {
        setProfileImage(response.data.imageUrl);
      } else {
        setProfileImage(process.env.PUBLIC_URL + '/add.png');
      }
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  }

  const renderPage = () => {
    return (
      <>
        <h1>Profile</h1>
        <ProfileInfo data={fetchCurrentUserData()}/>
        <Button
          text={'Edit'}
          onClick={handleEdit}
          IconTag={FaRegEdit}
        />
        <br/>
        <LogoutButton/>
      </>
    );
  }

  const handleEdit = () => {
    navigate(`/profile/edit`);
  }

  useEffect(() => {
    setLoading(true);
    fetchCurrentUserData().then(() => setLoading(false));
  }, []);

  return (
    <div className={'container center'}>
      <WaitModal
        show={loading}
      />
      <Header/>
      <main>
        {renderPage()}
      </main>
      <Footer/>
    </div>
  );
}

export default Profile;
