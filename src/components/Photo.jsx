import React from 'react';
import './Photo.css';

const Photo = ({src, alt, onClick}) => (
  <img
    src={src}
    alt={alt}
    className={'photo'}
    onClick={onClick}
  />
);

export default Photo;
