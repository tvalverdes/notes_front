//Estado de la aplicación y su método reducer

import { configureStore } from '@reduxjs/toolkit'
import toggleModal from './loginSlice'
import enableNotesSlice from './enableNotesSlice'

export const store = configureStore({
  reducer: {
    login: toggleModal,
    enableNotes: enableNotesSlice,
  },
})
