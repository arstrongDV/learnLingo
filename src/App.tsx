import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Teachers from './pages/Teachers'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/teachers' element={ <Teachers /> } />

        <Route path='/login' element={ <Home /> } />
        <Route path='/register' element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
