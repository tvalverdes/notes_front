import { store } from './store'

export const isNotesEnabled = () => {
  return store.getState().enableNotes
}

export const enableNotes = () => {
  store.dispatch({
    type: 'SET_ENABLE_NOTES',
    payload: true,
  })
}

export const disableNotes = () => {
  store.dispatch({
    type: 'SET_ENABLE_NOTES',
    payload: false,
  })
}
