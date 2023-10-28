const STATUS_CODE = [
  {
    code: 400,
    message: 'Correo en uso',
    status: 'error',
  },
  {
    code: 404,
    message: 'Credenciales incorrectas',
    status: 'error',
  },
  {
    code: 429,
    message: 'Demasiadas solicitudes, inténtalo más tarde',
    status: 'warning',
  },
  {
    code: 500,
    message: 'Error momentáneo, inténtalo más tarde',
    status: 'error',
  },
]

export const checkError = (error) => {
  return STATUS_CODE.find((status) => status.code == error)
}
