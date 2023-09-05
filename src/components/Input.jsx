import React from 'react';
import './styles.css';

const Input = ({ type, name, id, placeholder, error }) => (
    <>
        <div className={'formcontrol'}>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                required
            />
            {error}
        </div>
    </>
);

export default Input;
