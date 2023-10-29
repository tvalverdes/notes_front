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
import { checkError } from '../../utils/errors. utils'

export const Register = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const changeToLogin = () => {
    dispatch(changeModal(true))
  }
  const toast = useToast()
  const id = 'toast_id'
  const showToast = (title, status) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title,
        status: status || 'success',
        duration: 3000,
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
      if (res.status == 201) {
        showToast('Cuenta creada correctamente, inicia sesión')
        changeToLogin()
      }
      const errorFound = checkError(res.status)
      if (errorFound) {
        return showToast(errorFound.message, errorFound.status)
      }
      return showToast('Error al registrarse', 'error')
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
            autoComplete="off"
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
            autoComplete="off"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <SubmitButton text={t('register')} />
      </form>
    </section>
  )
}
