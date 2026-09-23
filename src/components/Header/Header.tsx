import React from 'react'
import style from './Header.module.css'
import sprite from '/icons.svg?no-inline'
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { useAuth } from '../../context/useAuth'
import { logoutUser } from '../../services/auth'

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, isLoading } = useAuth();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      toast.success('You have logged out');
    } else {
      toast.error(result.error);
    }
  };

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

        {!isLoading && (
          <span className={style.authBtns}>
            {isLoggedIn ? (
              <>
                <span className={style.userName}>{user?.name ?? user?.email}</span>
                <button onClick={handleLogout} className={style.register}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <span className={style.login}>
                  <svg width={20} height={20}>
                    <use className={style.loginIcon} href={`${sprite}#icon-login`}></use>
                  </svg>
                  <Link to='/login' state={{ backgroundLocation: location }}>Log in</Link>
                </span>
                <button onClick={() => navigate('/register', { state: { backgroundLocation: location } })} className={style.register}>
                  Registration
                </button>
              </>
            )}
          </span>
        )}
      </div>
    </header>
  )
}

export default Header