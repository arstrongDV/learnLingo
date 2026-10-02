import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/AuthProvider'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import Favorites from './pages/Favorites'
import Register from './components/AuthModals/Register/Register'
import Login from './components/AuthModals/Login/Login'
import NoLoggedInModal from './components/NoLoggedInModal/NoLoggedInModal'
import BookTrialModal from './components/BookTrialModal/BookTrialModal'
import Header from './components/Header/Header'

function AppRoutes() {
  const location = useLocation()
  const background = location.state?.backgroundLocation

  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path='/' element={ <Home /> } />
        <Route path='/teachers' element={ <Teachers /> } />
        <Route path='/favorites' element={ <Favorites /> } />
      </Routes>

      {background && (
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/auth-required' element={<NoLoggedInModal />} />
          <Route path='/book' element={<BookTrialModal />} />
        </Routes>
      )}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position='top-center' />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
