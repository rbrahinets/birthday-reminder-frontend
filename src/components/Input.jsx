import React from 'react';
import './Input.css';

const Input = ({type, name, id, placeholder, error, defaultValue}) => (
    <div className={'formcontrol'}>
        <input
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required
        />
        {error}
    </div>
);

export default Input;
