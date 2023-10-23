//Lógica del estado de la app
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggle: false,
}

export const enableNotesSlice = createSlice({
  name: 'enable',
  initialState,
  //Reducers
  reducers: {
    enableNotes: (state, action) => {
      return action.payload
    },
  },
})

//Actions viene del método createSlice de toolkit, y el changeToRegister no
//es el reducer declarado arriba, sino su acción
export const { enableNotes } = enableNotesSlice.actions
export default enableNotesSlice.reducer
