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
import { login } from '../../utils/auth.utils'
import { SubmitButton } from '../button/SubmitButton'
import { useDispatch } from 'react-redux'
import { enableNotes } from '../../redux/enableNotesSlice'
import { getNotes } from '../../utils/note.utils'
import { checkError } from '../../utils/errors. utils'

export const Login = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const dispatch = useDispatch()
  const showNotes = () => {
    dispatch(enableNotes(true))
  }
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
    password: yup.string().trim().required(t('passwordRequired')),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    if (errors.email || errors.password) {
      return
    } else {
      const res = await login(data)
      if (res.status == 200) {
        showNotes()
        getNotes()
        showToast('Sesión iniciada correctamente')
      }
      const errorFound = checkError(res.status)
      if (errorFound) {
        return showToast(errorFound.message, errorFound.status)
      }
      return showToast('Error al iniciar sesión', 'error')
    }
  }

  return (
    <section className="container mx-0 flex flex-col gap-4 justify-center items-center">
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
        {/* <div className="flex justify-between">
          <Checkbox
            color="#FFF"
            size="md"
            colorScheme="yellow"
            {...register('remember')}
          >
            {t('rememberMe')}
          </Checkbox>
          <Link color="#E59500">{t('forgotPassword')}</Link>
        </div> */}
        <SubmitButton text={t('loginButtonText')} />
      </form>
    </section>
  )
}
