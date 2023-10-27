import axios from 'axios'
import { API_URL } from '../config/config'
/* import { GoogleAuth } from 'google-auth-library'; */

axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

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

/* export const loginWithGoogle = async (data) => {
  const googleAuth = new GoogleAuth()
const authResult = await googleAuth.signIn();

const accessToken = authResult.accessToken;

const res = await fetch('/auth/google', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + accessToken,
  },
}); 

// Procesar la respuesta del servidor
const response = await res.json();

// Si la autenticación fue exitosa
if (response.success) {
  // Almacenar el token de acceso en el almacenamiento local
  localStorage.setItem('token', accessToken);

  // Redireccionar al usuario a la página principal
  window.location.href = '/';
} else {
  // Mostrar un mensaje de error
  console.log(response.error);
}
}*/

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
