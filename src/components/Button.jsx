import React from 'react';
import './Button.css';

const Button = ({text, onClick, IconTag, sizeIcon}) => (
    <button
        onClick={onClick}
    >
        <span>{text}</span>
        {IconTag && sizeIcon && <IconTag
            size={sizeIcon}
        />}
    </button>
);

export default Button;
