import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';
import FirebaseImage from './FirebaseImage';
import userService from '../services/UserService';

const ProfileInfo = ({data}) => {
  const dispatch = useDispatch();

  const {currentUser} = useSelector((state) => state.currentUser);
  const {profileImage} = useSelector((state) => state.profileImage);
  const {previewProfileImage} = useSelector((state) => state.previewProfileImage);

  const {
    setProfileImage,
    setPreviewProfileImage,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  return (
    <div className={'info-container'}>
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
        resetObject={data}
      />
      <div>{currentUser.firstName} {currentUser.lastName}</div>
      <div>{currentUser.email}</div>
    </div>
  );
}

export default ProfileInfo;
