import axios from 'axios'
import { API_URL } from '../config/config'

export const login = async (data) => {
  console.log(API_URL)
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    )
    return response
  } catch (error) {
    return error.response
  }
}

export const registerUser = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        email: data.email,
        password: data.password,
      },
      { withCredentials: true }
    )
    return response
  } catch (error) {
    return error.response
  }
}
