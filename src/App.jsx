import './App.css'
import { Navbar } from './components/navbar/Navbar'
import { Hero } from './components/hero/Hero'
import { Login } from './components/login/Login'
import { ModalWindow } from './components/modal/ModalWindow'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from './components/register/Register'
import { NoteCard } from './components/note/NoteCard'

function App() {
  const showLogin = useSelector((state) => state.login)
  const enableNotes = useSelector((state) => state.enableNotes)
  return (
    <>
      <div className="bg-primary-300 h-screen z-20">
        {!enableNotes ? (
          <NoteCard />
        ) : (
          <ModalWindow component={showLogin ? <Login /> : <Register />} />
        )}
      </div>
    </>
  )
}

export default App
