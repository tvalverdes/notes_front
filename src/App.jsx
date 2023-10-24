'use client'
import './App.css'
import { Login } from './components/login/Login'
import { ModalWindow } from './components/modal/ModalWindow'
import { useSelector } from 'react-redux'
import { Register } from './components/register/Register'
import { NoteCard } from './components/note/NoteCard'
import { useEffect, useState } from 'react'
import { LoadingModal } from './components/modal/LoadingModal'
import { startServer } from './utils/loading.utils'

function App() {
  const showLogin = useSelector((state) => state.login)
  const enableNotes = useSelector((state) => state.enableNotes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    startServer().then(() => setLoading(false))
  }, [])
  return (
    <>
      <div className="bg-primary-300 h-screen z-20">
        {loading ? <LoadingModal /> : null}
        {!enableNotes ? (
          <NoteCard />
        ) : (
          <ModalWindow
            loading={loading}
            component={showLogin ? <Login /> : <Register />}
          />
        )}
      </div>
    </>
  )
}

export default App
