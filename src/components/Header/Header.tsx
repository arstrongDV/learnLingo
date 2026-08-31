import React from 'react'
import style from './Header.module.css'
import sprite from '../../assets/icons.svg?no-inline'

const Header = () => {
  return (
    <header className={style.headerContainer}>
      <span className={style.content}>
        <span className={style.logo}>
          <svg width={28} height={28}>
            <use href={`${sprite}#icon-ukraine`}></use>
          </svg>
          <p>LearnLingo</p>
        </span>

        <ul className={style.linksList}>
          <li className={style.linksEl}><a href='/'>Home</a></li>
          <li className={style.linksEl}><a href='/teachers'>Teachers</a></li>
        </ul>
      </span>

      <span className={style.authBtns}>
        <span className={style.login}>
          <svg width={20} height={20}>
            <use href={`${sprite}#icon-login`}></use>
          </svg>
          <a href='/login'>Log in</a>
        </span>
        <span className={style.register}><a href='/register'>Registration</a></span>
      </span>
    </header>
  )
}

export default Header

