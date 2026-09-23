import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/AuthProvider'
import './App.css'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import Register from './components/AuthModals/Register/Register'
import Login from './components/AuthModals/Login/Login'

function AppRoutes() {
  const location = useLocation()
  const background = location.state?.backgroundLocation

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={ <Home /> } />
        <Route path='/teachers' element={ <Teachers /> } />
      </Routes>

      {background && (
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
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
