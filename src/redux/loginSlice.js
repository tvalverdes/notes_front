//Lógica del estado de la app
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggle: true,
}

export const showLoginSlice = createSlice({
  name: 'showLogin',
  initialState,
  //Reducers
  reducers: {
    changeModal: (state, action) => {
      return action.payload
    },
  },
})

//Actions viene del método createSlice de toolkit, y el changeToRegister no
//es el reducer declarado arriba, sino su acción
export const { changeModal } = showLoginSlice.actions
export default showLoginSlice.reducer
