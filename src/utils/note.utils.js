import axios from 'axios'
import { API_URL } from '../config/config'
axios.defaults.withCredentials = true

export const createNote = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/note`, {
      title: data.title,
      text: data.text,
    })
    return response
  } catch (error) {
    return error.response
  }
}

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`)
    return response
  } catch (error) {
    return error.response
  }
}

export const updateNote = async (data) => {
  const note = {
    id: data.id,
    title: data.title,
    text: data.text,
  }
  try {
    const response = await axios.put(`${API_URL}/note`, note)
    return response
  } catch (error) {
    return error.response
  }
}

export const deleteNote = async (id) => {
  const data = {
    id: id,
  }
  try {
    const response = await axios.put(`${API_URL}/delete/note`, data)
    return response
  } catch (error) {
    return error.response
  }
}
