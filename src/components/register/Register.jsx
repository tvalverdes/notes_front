import { useForm, useWatch } from 'react-hook-form'
import {
  Input,
  FormControl,
  FormErrorMessage,
  Link,
  Checkbox,
} from '@chakra-ui/react'
import { InputButton } from '../button/Button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Register = () => {
  const { t } = useTranslation()
  const schema = yup.object({
    mail: yup
      .string()
      .email(t('mailValidationMessage'))
      .required(t('mailRequired'))
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        t('mailValidationMessage')
      ),
    password: yup.string().required(t('passwordRequired')),
  })
  const { register, handleSubmit, formState, trigger } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState
  const onSubmit = (data) => console.log(data)
  console.log(errors)
  const [data, setData] = useState('')

  return (
    <section className="container mx-0 flex gap-4 justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormControl isInvalid={errors} className="flex flex-col gap-1">
          <Input
            {...register('mail')}
            placeholder={t('placeholderMail')}
            isInvalid={errors.mail}
            errorBorderColor="crimson"
            textColor="white"
            onChange={() => trigger('mail')}
          />
          <FormErrorMessage>{errors.mail?.message}</FormErrorMessage>
          <Input
            {...register('password')}
            type="password"
            placeholder={t('placeholderPassword')}
            errorBorderColor="crimson"
            textColor="white"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          <Input
            {...register('confirmPassword')}
            type="password"
            placeholder={t('placeholderPassword')}
            errorBorderColor="crimson"
            textColor="white"
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
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
        <InputButton text={t('loginButtonText')} />
      </form>
    </section>
  )
}
