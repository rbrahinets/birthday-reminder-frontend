import React, {useEffect} from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import Header from '../components/Header';
import ProfileInfo from '../components/ProfileInfo';
import ProfileEdit from '../components/ProfileEdit';
import FirebaseImage from '../components/FirebaseImage';
import Button from '../components/Button';
import WaitModal from '../components/WaitModal';
import Settings from '../components/Settings';
import Footer from '../components/Footer';
import userService from '../services/UserService';
import './../components/Button.css';

const Profile = () => {
  const dispatch = useDispatch();

  const {loading} = useSelector((state) => state.loading);
  const {isProfileInfoMode} = useSelector((state) => state.isProfileInfoMode);
  const {currentUser} = useSelector((state) => state.currentUser);
  const {profileImage} = useSelector((state) => state.profileImage);
  const {previewProfileImage} = useSelector((state) => state.previewProfileImage);

  const {
    setCurrentUser,
    setLoading,
    setProfileImage,
    setPreviewProfileImage,
    setIsProfileInfoMode,
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
        <h1>Info</h1>
        <FirebaseImage
          defaultImageUrl={`${process.env.PUBLIC_URL}/add.png`}
          object={currentUser}
          state={{
            firebaseImage: profileImage,
            previewFirebaseImage: previewProfileImage,
            setFirebaseImage: setProfileImage,
            setPreviewFirebaseImage: setPreviewProfileImage,
          }}
          service={userService}
          resetObject={fetchCurrentUserData}
        />
        {
          isProfileInfoMode ?
            <ProfileInfo updateProfileInfo={fetchCurrentUserData}/> :
            <ProfileEdit/>
        }
        {isProfileInfoMode &&
          <Button
            text={'Edit'}
            onClick={handleEdit}
            IconTag={FaRegEdit}
          />
        }
        <Settings/>
      </>
    );
  }

  const handleEdit = () => {
    setIsProfileInfoMode(false);
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
