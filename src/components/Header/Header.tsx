import style from './Header.module.css'
import sprite from '/icons.svg?no-inline'
import { Link, useLocation } from "react-router-dom";
import toast from 'react-hot-toast'
import { useAuth } from '../../context/useAuth'
import { logoutUser } from '../../services/auth'

const Header = () => {
  const location = useLocation();
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
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.brandNav}>
          <Link to='/' className={style.logo}>
            <svg width={28} height={28} aria-hidden='true'>
              <use href={`${sprite}#icon-ukraine`}></use>
            </svg>
            LearnLingo
          </Link>

          <nav aria-label='Main'>
            <ul className={style.navList}>
              <li><Link to='/' className={style.navLink}>Home</Link></li>
              <li><Link to='/teachers' className={style.navLink}>Teachers</Link></li>
              {isLoggedIn && <li><Link to='/favorites' className={style.navLink}>Favorites</Link></li>}
            </ul>
          </nav>
        </div>

        {!isLoading && (
          <div className={style.authActions}>
            {isLoggedIn ? (
              <>
                <span className={style.userName}>{user?.name ?? user?.email}</span>
                <button type='button' onClick={handleLogout} className={style.primaryButton}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to='/login' state={{ backgroundLocation: location }} className={style.loginLink}>
                  <svg width={20} height={20} aria-hidden='true'>
                    <use href={`${sprite}#icon-login`}></use>
                  </svg>
                  Log in
                </Link>
                <Link to='/register' state={{ backgroundLocation: location }} className={style.primaryButton}>
                  Registration
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
