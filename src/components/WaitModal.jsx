import React from 'react';
import {Modal} from 'react-bootstrap';

const WaitModal = ({show}) => {
    return (
        <Modal
            show={show}
            dialogClassName={'modal-wait'}
        >
            <div className={'modal-wait-content'}>
                <h1>Wait for a moment...</h1>
            </div>
        </Modal>
    );
};

export default WaitModal;
