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
import { Navbar } from './components/navbar/Navbar'
import { AddNote } from './components/note/AddNote'

function App() {
  const showLogin = useSelector((state) => state.login)
  const enableNotes = useSelector((state) => state.enableNotes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    startServer().then(() => setLoading(false))
  }, [])
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-primary-600 h-screen z-20">
        {loading ? <LoadingModal /> : null}
        {enableNotes ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4">
              <NoteCard />
              <NoteCard />
              <NoteCard />
              <NoteCard />
              <NoteCard />
            </div>
            <AddNote />
          </>
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
