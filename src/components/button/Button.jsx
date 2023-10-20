import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeModal } from '../../redux/loginSlice'
import { useTranslation } from 'react-i18next'

export const InputButton = ({ text, method }) => {
  const loginState = useSelector((state) => state.login)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  console.log(method)
  const handleState = () => {
    dispatch(changeModal(!loginState))
  }

  return (
    <>
      <Button
        type="submit"
        background="#E59500"
        onClick={!method ? handleState : method}
        className="opacity-100 z-10"
      >
        {!text ? (loginState ? t('register') : t('login')) : text}
      </Button>
    </>
  )
}
