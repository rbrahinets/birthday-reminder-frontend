import React from 'react';
import {useSelector} from 'react-redux';
import {Modal} from 'react-bootstrap';
import './WaitModal.css';

const WaitModal = () => {
  const {isDarkMode} = useSelector((state) => state.isDarkMode);

  return (
    <Modal
      show={true}
      dialogClassName={`modal-wait background-${isDarkMode ? 'dark' : 'light'}`}
      className={'center'}
    >
      <img
        className={'loading'}
        src={process.env.PUBLIC_URL + '/loading.gif'}
        alt={'loading'}
      />
    </Modal>
  );
};

export default WaitModal;
