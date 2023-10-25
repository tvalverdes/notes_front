import axios from 'axios'
import { API_URL } from '../config/config'
axios.defaults.withCredentials = true

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: data.email,
      password: data.password,
    })
    return response
  } catch (error) {
    return error.response
  }
}

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email: data.email,
      password: data.password,
    })
    return response
  } catch (error) {
    return error.response
  }
}

export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    })
    return response
  } catch (error) {
    return error.response
  }
}

/* export const isUserAuthenticated = async () => {
  try {
    const token = document.cookie.token
    if (!token) {
      return false
    }
    const response = await axios.get(`${API_URL}/auth/me`, {
      withCredentials: true,
    })
    return response
  } catch (error) {
    return error.response
  }
} */
