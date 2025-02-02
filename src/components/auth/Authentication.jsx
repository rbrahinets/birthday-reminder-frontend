import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import WaitModal from '../WaitModal';

const Authentication = () => {
  const dispatch = useDispatch();

  const {isVisibleSignInModal} = useSelector((state) => state.isVisibleSignInModal);
  const {isVisibleSignUpModal} = useSelector((state) => state.isVisibleSignUpModal);
  const {isVisibleWaitModal} = useSelector((state) => state.isVisibleWaitModal);

  const {
    setIsVisibleSignInModal,
    setIsVisibleSignUpModal,
    setIsVisibleWaitModal,
    setIsAuthenticated,
  } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const renderAuthentication = () => {
    return (
      <>
        {isVisibleWaitModal ? <WaitModal/> :
          <>
            <SignInModal
              show={isVisibleSignInModal}
              onHide={() => setIsVisibleSignInModal(false)}
              onShowWaitModal={() => setIsVisibleWaitModal(true)}
              onHideWaitModal={() => setIsVisibleWaitModal(false)}
              onShowSignUpModal={() => setIsVisibleSignUpModal(true)}
              onSignInSuccess={() => setIsAuthenticated(true)}
            />
            <SignUpModal
              show={isVisibleSignUpModal}
              onHide={() => setIsVisibleSignUpModal(false)}
              onShowWaitModal={() => setIsVisibleWaitModal(true)}
              onHideWaitModal={() => setIsVisibleWaitModal(false)}
              onShowSignInModal={() => setIsVisibleSignInModal(true)}
            />
          </>}
      </>
    );
  };

  return (
    <>
      {renderAuthentication()}
    </>
  );
};

export default Authentication;
