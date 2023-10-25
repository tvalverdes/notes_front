'use client'
import './App.css'
import { Login } from './components/login/Login'
import { ModalWindow } from './components/modal/ModalWindow'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from './components/register/Register'
import { NoteCard } from './components/note/NoteCard'
import { useEffect, useState } from 'react'
import { LoadingModal } from './components/modal/LoadingModal'
import { Navbar } from './components/navbar/Navbar'
import { AddNote } from './components/note/AddNote'
import { getNotes } from './utils/note.utils'
import { enableNotes } from './redux/enableNotesSlice'

function App() {
  const dispatch = useDispatch()
  const showLogin = useSelector((state) => state.login)
  const isUserAuth = useSelector((state) => state.enableNotes)

  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  const loadNotes = async () => {
    const res = await getNotes()
    if (res.status != 200) {
      setNotes([])
      dispatch(enableNotes(false))
    } else {
      setNotes(res.data)
      dispatch(enableNotes(true))
    }
  }

  useEffect(() => {
    loadNotes().then(() => setLoading(false))
  }, [isUserAuth])

  useEffect(() => {
    loadNotes()
  }, [notes])

  return (
    <>
      <Navbar />
      <div className="bg-primary-600 h-[calc(100vh-96px)] z-20">
        {loading ? <LoadingModal /> : null}
        {isUserAuth ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4">
              {notes.map((note) => {
                return (
                  <NoteCard
                    key={note._id}
                    title={note.title}
                    text={note.text}
                  />
                )
              })}
            </div>
            <AddNote onNewNoteAdded={notes} />
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
