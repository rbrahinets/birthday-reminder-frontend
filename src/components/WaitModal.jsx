import React from 'react';
import {Modal} from 'react-bootstrap';
import './WaitModal.css';

const WaitModal = ({show}) => {
  return (
    <Modal
      show={show}
      dialogClassName={'modal-wait'}
      className={'center'}
    >
      <img
        className={'loading'}
        src={process.env.PUBLIC_URL + '/loading.gif'}
        alt={'loading'}
      />
    </Modal>
  );
}

export default WaitModal;
