import { Button } from '@chakra-ui/react'

export const InputButton = ({ text }) => {
  return (
    <>
      <Button type="submit" background="#E59500" className="opacity-100 z-10">
        {text}
      </Button>
    </>
  )
}
