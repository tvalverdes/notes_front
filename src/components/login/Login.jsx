import { useForm } from 'react-hook-form'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(errors)
  const [data, setData] = useState('')
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <section className="container mx-0 flex gap-4 justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <Input
          {...register('mail', {
            required: 'Debes ingresar el correo',
            maxLength: {
              value: 254,
              message: 'El correo no puede tener más de 254 caracteres',
            },
          })}
          placeholder="juanperez@gmail.com"
        />
        <Input
          {...register('password', { required: true })}
          type="password"
          placeholder="password"
        />
        <Button type="submit" colorScheme="blue">
          Button
        </Button>
        <p>{data}</p>
      </form>
    </section>
  )
}
