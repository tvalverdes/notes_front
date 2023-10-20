import { useForm, useWatch } from 'react-hook-form'
import {
  Input,
  FormControl,
  FormErrorMessage,
  Link,
  Checkbox,
} from '@chakra-ui/react'
import { InputButton } from '../button/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Login = () => {
  useEffect(() => {})
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
            focusBorderColor="#E59500"
            isInvalid={errors.mail !== undefined} //errors.mail returns true always, that's why I'm not equals
            borderColor="white"
            errorBorderColor="crimson"
            textColor="white"
            onChange={() => trigger('mail')}
          />
          <FormErrorMessage>{errors.mail?.message}</FormErrorMessage>
          <Input
            {...register('password')}
            type="password"
            isInvalid={errors.mail !== undefined}
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
        <InputButton text={t('loginButtonText')} method={onSubmit} />
      </form>
    </section>
  )
}
