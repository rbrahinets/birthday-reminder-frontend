import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useTranslation} from 'react-i18next';
import {FaRegEdit} from 'react-icons/fa';
import {actionCreators} from '../state';
import Button from './Button';

const ProfileInfo = ({updateProfileInfo}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {currentUser} = useSelector((state) => state.currentUser);

  const {
    setLoading,
    setIsProfileInfoMode,
  } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleEdit = () => {
    setIsProfileInfoMode(false);
  }

  useEffect(() => {
    setLoading(true);
    updateProfileInfo()
      .then(
        () => {
          setLoading(false);
          window.scrollTo(0, 0);
        }
      );
  }, []);

  return (
    <div className={'info-container'}>
      <div>{currentUser.firstName} {currentUser.lastName}</div>
      <div>{currentUser.email}</div>
      <Button
        text={t('edit')}
        onClick={handleEdit}
        IconTag={FaRegEdit}
      />
    </div>
  );
}

export default ProfileInfo;
