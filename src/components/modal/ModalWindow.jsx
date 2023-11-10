import {
  Avatar,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { SwitchAuthButton } from '../button/SwitchAuthButton'
import { useEffect, useState } from 'react'

export function ModalWindow({ component, loading }) {
  const { onClose } = useDisclosure()
  const [spinning, setSpinning] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    setSpinning(true)

    setTimeout(() => {
      setSpinning(false)
    }, 300)
  }, [component])

  return (
    <>
      <Modal
        motionPreset="slideInBottom"
        isOpen={!loading}
        onClose={onClose}
        size={'sm'}
        isCentered
      >
        <ModalOverlay backgroundColor={'#546E8050'} />
        <ModalContent mx={2} bg={'transparent'}>
          <div className="absolute mx-1 -top-12">
            <SwitchAuthButton />
            <ModalCloseButton />
          </div>
          <ModalBody
            className={`bg-primary-800/40 mx-1 rounded-lg flex flex-col justify-center items-center gap-4 spin ${
              spinning && 'spinning'
            }`}
          >
            <Avatar name="Logo" size="lg" src="logo.png" />
            <h1 className="text-3xl font-bold">{t('welcomeText')}</h1>
            <Text fontSize="sm">{t('helperText')}</Text>
            {component}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
