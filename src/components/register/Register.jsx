import { useForm } from 'react-hook-form'
import {
  Input,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SubmitButton } from '../button/SubmitButton'
import { registerUser } from '../../utils/auth.utils'
import { useDispatch } from 'react-redux'
import { changeModal } from '../../redux/loginSlice'

export const Register = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const changeToLogin = () => {
    dispatch(changeModal(true))
  }
  const toast = useToast()
  const id = 'toast_id'
  const showToast = (title, description, status) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title,
        description,
        status: status || 'error',
        duration: 4000,
        isClosable: false,
      })
    }
  }
  const schema = yup.object({
    email: yup
      .string()
      .trim()
      .email(t('mailValidationMessage'))
      .required(t('mailRequired'))
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z_.]{2,}$/,
        t('mailValidationMessage')
      ),
    password: yup
      .string()
      .trim()
      .required(t('passwordRequired'))
      .min(8, t('passwordMin')),
  })
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState
  const onSubmit = async (data) => {
    if (errors.email || errors.password) {
      return
    } else {
      const res = await registerUser(data)
      if (res.status == 400) {
        return showToast(
          'Correo En Uso',
          'Prueba con otro correo o inicia sesión'
        )
      }
      if (res.status == 500) {
        return showToast(
          'Servidor no disponible',
          'Inténtalo de nuevo más tarde o contacta con el administrador'
        )
      }
      showToast('Cuenta creada correctamente', '¡Inicia sesión!', 'success')
      changeToLogin()
    }
  }

  return (
    <section className="container mx-0 flex gap-4 justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormControl isInvalid={errors} className="flex flex-col gap-1">
          <Input
            {...register('email')}
            placeholder={t('placeholderMail')}
            focusBorderColor="#E59500"
            isInvalid={errors.email !== undefined}
            borderColor="white"
            errorBorderColor="crimson"
            textColor="white"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>

          <Input
            {...register('password')}
            type="password"
            placeholder={t('placeholderPassword')}
            focusBorderColor="#E59500"
            isInvalid={errors.password !== undefined}
            borderColor="white"
            errorBorderColor="crimson"
            textColor="white"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <SubmitButton text={t('register')} />
      </form>
    </section>
  )
}
