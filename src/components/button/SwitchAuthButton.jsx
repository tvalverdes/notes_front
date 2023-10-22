import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { changeModal } from '../../redux/loginSlice'
import { useTranslation } from 'react-i18next'

export const SwitchAuthButton = ({ text, method }) => {
  const loginState = useSelector((state) => state.login)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleState = () => {
    dispatch(changeModal(!loginState))
  }
  return (
    <>
      <Button
        type="submit"
        background="#E59500"
        onClick={handleState}
        className="opacity-100 z-10"
      >
        {loginState ? t('register') : t('login')}
      </Button>
    </>
  )
}
