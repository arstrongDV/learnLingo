import { Link, useLocation, useNavigate, type Location } from 'react-router-dom'
import Modal from '../Modal/Modal'
import style from './NoLoggedInModal.module.css'

const NoLoggedInModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // The page this modal is shown over (e.g. /teachers).
  // Login/Register open over the same page, not over this modal.
  const modalState = { backgroundLocation: location.state?.backgroundLocation as Location }

  const handleClose = () => navigate(-1)

  return (
    <Modal isOpen={true} onClose={handleClose} labelledBy='no-logged-in-title'>
      <div className={style.content}>
        <div className={style.titleBlock}>
          <h2 id='no-logged-in-title' className={style.title}>
            Log in to continue
          </h2>
          <p className={style.text}>
            Adding teachers to favorites is available only for authorized users.
            Log in or create an account to save teachers you like.
          </p>
        </div>

        <div className={style.actions}>
          {/* replace: closing Login/Register goes back to the page, not to this modal */}
          <Link to='/login' state={modalState} replace className={style.primaryButton}>
            Log in
          </Link>
          <Link to='/register' state={modalState} replace className={style.secondaryButton}>
            Registration
          </Link>
        </div>
      </div>
    </Modal>
  )
}

export default NoLoggedInModal
