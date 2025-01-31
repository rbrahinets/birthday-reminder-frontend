import React from 'react';
import './Input.css';

const Input = ({
                 type,
                 name,
                 id,
                 placeholder,
                 error,
                 defaultValue,
                 min,
                 max,
                 onClick,
               }) => (
  <div className={'formcontrol'}>
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      min={min}
      max={max}
      onClick={onClick}
      required
    />
    {error}
  </div>
);

export default Input;
