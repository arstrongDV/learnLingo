import React from 'react'
import style from './Header.module.css'
import sprite from '/icons.svg?no-inline'
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className={style.headerContainer}>
      <div className={style.headerWrapper}>
        <span className={style.content}>
          <span className={style.logo}>
            <svg width={28} height={28}>
              <use href={`${sprite}#icon-ukraine`}></use>
            </svg>
            <Link to='/'>LearnLingo</Link>
          </span>

          <ul className={style.linksList}>
            <li className={style.linksEl}><Link to='/'>Home</Link></li>
            <li className={style.linksEl}><Link to='/teachers'>Teachers</Link></li>
          </ul>
        </span>

        <span className={style.authBtns}>
          <span className={style.login}>
            <svg width={20} height={20}>
              <use href={`${sprite}#icon-login`}></use>
            </svg>
            <Link to='/login' state={{ backgroundLocation: location }}>Log in</Link>
          </span>
            <Link to='/register' state={{ backgroundLocation: location }} className={style.register}>
              Registration
            </Link>
        </span>
      </div>
    </header>
  )
}

export default Header
