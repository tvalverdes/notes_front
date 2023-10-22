'use client'
import { useForm } from 'react-hook-form'
import {
  Input,
  FormControl,
  FormErrorMessage,
  Link,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { login } from '../../utils/login.utils'
import { SubmitButton } from '../button/SubmitButton'

export const Login = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const id = 'toast_id'
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
    password: yup.string().trim().required(t('passwordRequired')),
  })
  const { register, handleSubmit, formState, trigger, clearErrors } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState
  const onSubmit = async (data) => {
    if (errors.email || errors.password) {
      return
    } else {
      const res = await login(data)
      if (res.status == 404) {
        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'Credenciales incorrectas',
            description: 'Corrige tu correo o contraseña y vuelve a intentarlo',
            status: 'error',
            duration: 4000,
            isClosable: false,
          })
        }
      }
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
            isInvalid={errors.email !== undefined} //errors.mail returns true always, that's why I'm not equals
            borderColor="white"
            errorBorderColor="crimson"
            textColor="white"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          <Input
            {...register('password')}
            type="password"
            isInvalid={errors.password !== undefined}
            focusBorderColor="#E59500"
            placeholder={t('placeholderPassword')}
            errorBorderColor="crimson"
            textColor="white"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <div className="flex justify-between">
          <Checkbox
            color="#FFF"
            size="md"
            colorScheme="yellow"
            {...register('remember')}
          >
            {t('rememberMe')}
          </Checkbox>
          <Link color="#E59500">{t('forgotPassword')}</Link>
        </div>
        <SubmitButton text={t('loginButtonText')} />
      </form>
    </section>
  )
}
