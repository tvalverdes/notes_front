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
  useToast,
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
import { useDispatch, useSelector } from 'react-redux'
import { refreshNotes } from '../../redux/refreshNotesSlice'
import { checkError } from '../../utils/errors. utils'

export const AddNote = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const showToast = (message, status) => {
    toast({
      title: message,
      status: status || 'success',
      duration: 3000,
      isClosable: true,
    })
  }
  const dispatch = useDispatch()
  const onNotesRefresh = useSelector((state) => state.refreshNotes)
  const schema = yup.object({
    title: yup.string().trim().notRequired().max(100, 'Hasta 100 caracteres'),
    text: yup.string().trim().required('Ingresa el texto de la nota'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    if (errors.title || errors.text) {
      return
    }
    const res = await createNote(data)
    if (res.status == 201) {
      dispatch(refreshNotes(!onNotesRefresh))
      showToast('¡Nota creada!')
      onClose()
      return reset()
    }
    const errorFound = checkError(res.status)
    if (errorFound) {
      return showToast(errorFound.message, errorFound.status)
    }
    return showToast('Error al crear la nota', 'error')
  }
  return (
    <>
      <button onClick={onOpen} className="absolute right-10 bottom-44 z-10">
        <div
          tabIndex="0"
          className="plusButton  absolute right-10 -bottom-12 md:-bottom-10 lg:-bottom-4 -left-4 z-10"
        >
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
        <ModalContent
          mx={2}
          minH={errors.title || errors.text ? 385 : 343}
          maxH={errors.title || errors.text ? 385 : 343}
        >
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
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
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
                <FormErrorMessage className="pb-2">
                  {errors.text?.message}
                </FormErrorMessage>
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
