import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {CgProfile} from 'react-icons/cg'
import {FaBars} from 'react-icons/fa'
import LinkButton from './LinkButton'
import './Header.css'
import './LanguageSelector.css'


const Header = () => {
  const {t} = useTranslation()
  const {isDarkMode} = useSelector((state) => state.isDarkMode)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  const renderLinks = () => (
    <div className={`link-container ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
      <LinkButton
        text={t('birthdays')}
        uri={'/birthdays'}
        onClick={closeMenu}
      />
      <LinkButton
        text={t('profile')}
        uri={'/profile'}
        Icon={CgProfile}
        onClick={closeMenu}
      />
      <a
        href={'#footer'}
        className={`link link-${isDarkMode ? 'dark' : 'light'}`}
        onClick={closeMenu}
      >
        {t('contacts')}
      </a>
    </div>
  )

  const renderHeader = () => {
    return (
      <div className={'header-content'}>
        <Link
          to={`/`}
          className="logo"
        >
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt={'logo'}
          />
        </Link>
        <div className="menu-toggle" onClick={toggleMenu}>
          <FaBars/>
        </div>
        {renderLinks()}
      </div>
    )
  }

  return (
    <header className={`${isDarkMode ? 'dark' : 'light'}-header`}>
      {renderHeader()}
    </header>
  )
}

export default Header
