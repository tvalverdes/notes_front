//Lógica del estado de la app
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggle: false,
}

export const refreshNotesSlice = createSlice({
  name: 'refreshNotes',
  initialState,
  //Reducers
  reducers: {
    refreshNotes: (state, action) => {
      return action.payload
    },
  },
})

//Actions viene del método createSlice de toolkit, y el changeToRegister no
//es el reducer declarado arriba, sino su acción
export const { refreshNotes } = refreshNotesSlice.actions
export default refreshNotesSlice.reducer
