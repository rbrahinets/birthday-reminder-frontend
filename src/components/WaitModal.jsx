import React from 'react';
import {Modal} from 'react-bootstrap';

const WaitModal = ({show}) => {
    return (
        <Modal
            show={show}
            dialogClassName={'modal-wait'}
        >
            <img
                src={process.env.PUBLIC_URL + '/loading.gif'}
                alt={'loading'}
            />
        </Modal>
    );
}

export default WaitModal;
