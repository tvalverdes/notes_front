import axios from 'axios'
import { API_URL } from '../config/config'

export const startServer = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/loading`)
    return response
  } catch (error) {
    return error.response
  }
}
