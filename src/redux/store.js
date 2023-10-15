//Estado de la aplicación y su método reducer

import { configureStore } from '@reduxjs/toolkit'
import showLoginReducer from './loginSlice'

export const store = configureStore({
  reducer: {
    login: showLoginReducer,
  },
})
