import { useState } from 'react'
import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { Hero } from './components/hero/Hero'
import { Login } from './components/login/Login'
import { ModalWindow } from './components/Modal/ModalWindow'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from './components/register/Register'

function App() {
  const showLogin = useSelector((state) => state.login)
  return (
    <>
      <div className="bg-primary-300 h-screen z-20">
        <ModalWindow component={showLogin ? <Login /> : <Register />} />
      </div>
    </>
  )
}

export default App
