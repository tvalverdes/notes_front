import { Button } from '@chakra-ui/react'

export const SubmitButton = ({ text, method }) => {
  return (
    <>
      <Button
        type="submit"
        background="#E59500"
        onClick={method}
        className="opacity-100 z-10"
      >
        {text}
      </Button>
    </>
  )
}
