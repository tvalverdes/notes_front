//Lógica del estado de la app
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showLogin: true,
}

export const showLoginSlice = createSlice({
  name: 'showLogin',
  initialState,
  //Reducers
  reducers: {
    changeToRegister: (state, action) => {
      const { showLogin } = action.payload
      state.showLogin = showLogin
    },
  },
})

//Actions viene del método createSlice de toolkit, y el changeToRegister no
//es el reducer declarado arriba, sino su acción
export const { changeToRegister } = showLoginSlice.actions
export default showLoginSlice.reducer
