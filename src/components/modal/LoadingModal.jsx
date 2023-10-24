import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { LoadingIcon } from '../loader/LoadingIcon'

export const LoadingModal = () => {
  return (
    <Modal motionPreset="slideInBottom" isOpen={true} size={'sm'} isCentered>
      <ModalOverlay />
      <ModalContent bg={'transparent'} width={'fit-content'}>
        <LoadingIcon />
      </ModalContent>
    </Modal>
  )
}
