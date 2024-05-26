import React from 'react';
import './Button.css';

const Button = ({text, onClick, IconTag}) => (
    <button
        onClick={onClick}
    >
        <span>{text}</span>
        {IconTag && <IconTag
            size={20}
        />}
    </button>
);

export default Button;
