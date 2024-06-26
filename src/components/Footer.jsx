import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css'

const Footer = () => (
  <footer id={'footer'}>
    <div>
      <img
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt={'logo'}
        className={'footer-logo'}
      />
      <div>Copyright &copy; 2023 All Rights Reserved</div>
    </div>
    <div>
      <h3>Contacts</h3>
      <Link
        to={'https://www.linkedin.com/in/rbrahinets'}
        target={'_blank'}
        className={'footer-link icon-container'}
      >
        <img
          src={process.env.PUBLIC_URL + '/linkedin.png'}
          alt={'linkedin'}
          className={'footer-link-logo'}
        />
        <span>Rostyslav Brahinets</span>
      </Link>
      <br/>
      <Link
        to={'https://www.linkedin.com/in/%D1%8F%D0%BD%D0%B0-%D1%82%D0%BA%D0%B0%D0%BB%D0%B8%D1%87-6a332528b/'}
        target={'_blank'}
        className={'footer-link icon-container'}
      >
        <img
          src={process.env.PUBLIC_URL + '/linkedin.png'}
          alt={'linkedin'}
          className={'footer-link-logo'}
        />
        <span>Яна Ткалич</span>
      </Link>
    </div>
    <div>
      <h3>Info</h3>
      <Link
        to={'https://github.com/rbrahinets/birthday-reminder-frontend'}
        target={'_blank'}
        className={'footer-link icon-container'}
      >
        <img
          src={process.env.PUBLIC_URL + '/github.png'}
          alt={'github'}
          className={'footer-link-logo'}
        />
        <span>Front-end</span>
      </Link>
      <br/>
      <Link
        to={'https://github.com/rbrahinets/birthday-reminder-backend'}
        target={'_blank'}
        className={'footer-link icon-container'}
      >
        <img
          src={process.env.PUBLIC_URL + '/github.png'}
          alt={'github'}
          className={'footer-link-logo'}
        />
        <span>Back-end</span>
      </Link>
    </div>
    <div>
      <h3>Follow us</h3>
      <Link
        to={'https://instagram.com/rbrahinets'}
        target={'_blank'}
        className={'footer-link icon-container'}
      >
        <img
          src={process.env.PUBLIC_URL + '/instagram.png'}
          alt={'instagram'}
          className={'footer-link-logo'}
        />
        <span>@rbrahinets</span>
      </Link>
      <br/>
      <Link
        to={'https://instagram.com/yana_tkalych'}
        target={'_blank'}
        className={'footer-link icon-container'}
      >
        <img
          src={process.env.PUBLIC_URL + '/instagram.png'}
          alt={'instagram'}
          className={'footer-link-logo'}
        />
        <span>@yana_tkalych</span>
      </Link>
    </div>
  </footer>
);

export default Footer;
