import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
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
import { createNote, updateNote } from '../../utils/note.utils'
import { useDispatch, useSelector } from 'react-redux'
import { refreshNotes } from '../../redux/refreshNotesSlice'

export const ShowNote = ({ id, title, text, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const onNotesRefresh = useSelector((state) => state.refreshNotes)
  const schema = yup.object({
    id: yup.string().required(),
    title: yup.string().trim().notRequired(),
    text: yup.string().trim().required('Ingresa el texto de la nota'),
  })
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id,
      title,
      text,
    },
  })
  const { errors } = formState
  const onSubmit = async (data) => {
    if (errors.title || errors.text) {
      return
    }
    if (data.title !== title || data.text !== text) {
      const res = await updateNote(data)
      dispatch(refreshNotes(!onNotesRefresh))
    }
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Nota</ModalHeader>
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
                  defaultValue={title}
                ></Input>
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
                  defaultValue={text}
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
