import React from 'react';
import {useSelector} from 'react-redux';

const ProfileInfo = () => {
  const {currentUser} = useSelector((state) => state.currentUser);

  return (
    <div className={'info-container'}>
      <div>{currentUser.firstName} {currentUser.lastName}</div>
      <div>{currentUser.email}</div>
    </div>
  );
}

export default ProfileInfo;
