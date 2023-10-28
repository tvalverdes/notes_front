'use client'
import './App.css'
import { Login } from './components/login/Login'
import { ModalWindow } from './components/modal/ModalWindow'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from './components/register/Register'
import { CardNote } from './components/note/CardNote'
import { useEffect, useState } from 'react'
import { LoadingModal } from './components/modal/LoadingModal'
import { Navbar } from './components/navbar/Navbar'
import { AddNote } from './components/note/AddNote'
import { getNotes } from './utils/note.utils'
import { enableNotes } from './redux/enableNotesSlice'
import { Hero } from './components/hero/Hero'
import { Footer } from './components/footer/Footer'

function App() {
  const dispatch = useDispatch()
  const showLogin = useSelector((state) => state.login)
  const isUserAuth = useSelector((state) => state.enableNotes)
  const onNotesRefresh = useSelector((state) => state.refreshNotes)

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
  }, [onNotesRefresh])

  return (
    <>
      <Navbar />
      <div className={`bg-primary-600 main-div z-20`}>
        {loading ? <LoadingModal /> : null}
        <div className="bg-primary-600 cards  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-2">
          {isUserAuth ? (
            <>
              {notes.map((note) => {
                return (
                  <CardNote
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    text={note.text}
                  />
                )
              })}
              {notes.length == 0 ? <Hero /> : null}
              <AddNote />
            </>
          ) : (
            <ModalWindow
              loading={loading}
              component={showLogin ? <Login /> : <Register />}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
