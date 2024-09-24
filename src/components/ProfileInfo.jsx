import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state';

const ProfileInfo = ({updateProfileInfo}) => {
  const dispatch = useDispatch();

  const {currentUser} = useSelector((state) => state.currentUser);

  const {
    setLoading,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    setLoading(true);
    updateProfileInfo().then(() => setLoading(false));
  }, []);

  return (
    <div className={'info-container'}>
      <div>{currentUser.firstName} {currentUser.lastName}</div>
      <div>{currentUser.email}</div>
    </div>
  );
}

export default ProfileInfo;
