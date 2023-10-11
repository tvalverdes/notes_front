import { useState } from 'react'
import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { Hero } from './components/hero/Hero'
import { Login } from './components/login/Login'
import { ModalWindow } from './components/Modal/ModalWindow'
function App() {
  return (
    <>
      {/* 
      <Navbar /> */}
      <ModalWindow component={<Login />} />
    </>
  )
}

export default App
