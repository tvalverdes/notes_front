import axios from 'axios'
import { API_URL } from '../config/config'

export const createNote = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/note`,
      {
        title: data.title,
        text: data.text,
      },
      { withCredentials: true }
    )
    return response
  } catch (error) {
    return error.response
  }
}
