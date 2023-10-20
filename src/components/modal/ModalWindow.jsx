import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { InputButton } from '../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { changeModal } from '../../redux/loginSlice'
import { useState } from 'react'

export function ModalWindow({ component }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { t } = useTranslation()
  const loginState = useSelector((state) => state.login)
  const dispatch = useDispatch()
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        size={'sm'}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className="mx-2">
          <div className="absolute -top-12">
            <InputButton />
            <ModalCloseButton />
          </div>
          <ModalBody className="bg-primary-800/90 rounded-lg flex flex-col justify-center items-center gap-4">
            <Avatar name="Logo" size="lg" src="logo_notas.webp" />
            <h1 className="text-3xl font-bold">{t('welcomeText')}</h1>
            <Text fontSize="sm">{t('helperText')}</Text>
            {component}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
