import React from 'react';

const Input = ({type, name, id, placeholder, error}) => (
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
);

export default Input;
