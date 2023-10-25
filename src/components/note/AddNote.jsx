import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SubmitButton } from '../button/SubmitButton'
import { createNote } from '../../utils/note.utils'

export const AddNote = ({ onNewNoteAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const schema = yup.object({
    title: yup.string().trim().notRequired(),
    text: yup.string().trim().required('Ingresa el texto de la nota'),
  })
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const { errors } = formState
  const onSubmit = async (data) => {
    if (errors.title || errors.text) {
      return
    } else {
      const res = await createNote(data)
      console.log(res)
    }
  }
  return (
    <>
      <button onClick={onOpen}>
        <div tabIndex="0" className="plusButton absolute right-10 bottom-10">
          <svg
            className="plusIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
          >
            <g mask="url(#mask0_21_345)">
              <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
            </g>
          </svg>
        </div>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Nota</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className="flex flex-col gap-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors}>
                <FormLabel>Título</FormLabel>
                <Input
                  {...register('title')}
                  placeholder="Ingresa el título"
                  focusBorderColor="#E59500"
                  isInvalid={errors.title !== undefined} //errors.mail returns true always, that's why I'm not equals
                  borderColor="black"
                  errorBorderColor="crimson"
                  textColor="black"
                />
              </FormControl>
              <FormControl isInvalid={errors} isRequired>
                <FormLabel className="pt-2">Texto</FormLabel>
                <Textarea
                  {...register('text')}
                  placeholder="¿Qué quieres recordar?"
                  focusBorderColor="#E59500"
                  isInvalid={errors.text !== undefined} //errors.mail returns true always, that's why I'm not equals
                  borderColor="black"
                  errorBorderColor="crimson"
                  textColor="black"
                  resize={'none'}
                />
                <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
              </FormControl>
              <div className="w-full grid grid-cols-2">
                <SubmitButton text={'Guardar'} />
                <Button ms={3} onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
