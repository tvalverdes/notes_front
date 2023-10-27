import {
  Button,
  Divider,
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
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SubmitButton } from '../button/SubmitButton'
import { createNote, updateNote } from '../../utils/note.utils'
import { useDispatch, useSelector } from 'react-redux'
import { refreshNotes } from '../../redux/refreshNotesSlice'
import { useState } from 'react'
import { FiEdit, FiEye } from 'react-icons/fi'

export const ShowNote = ({ id, title, text, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const onNotesRefresh = useSelector((state) => state.refreshNotes)
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const showToast = () => {
    toast({
      title: '¡Nota modificada!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }
  const schema = yup.object({
    id: yup.string().required(),
    title: yup.string().trim().notRequired().max(100, 'Hasta 100 caracteres'),
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
    showToast()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={'md'}
        scrollBehavior={'inside'}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          mx={2}
          minH={errors.title || errors.text ? 420 : 382}
          maxH={errors.title || errors.text ? 420 : 382}
        >
          <ModalHeader>
            {!isEditing ? title || 'Sin título' : 'Editar nota'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className=" flex flex-col gap-1">
            <div className="flex flex-col justify-center items-end">
              <button
                className="w-fit text-2xl mb-2 text-secondary-500"
                onClick={() => setIsEditing(!isEditing)}
              >
                {!isEditing ? <FiEdit /> : <FiEye />}
              </button>
              <Divider />
            </div>
            {!isEditing ? (
              text
            ) : (
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
                    rows={3}
                    defaultValue={text}
                  />
                  <FormErrorMessage className="pb-2">
                    {errors.text?.message}
                  </FormErrorMessage>
                </FormControl>
                <div className="w-full grid grid-cols-2">
                  <SubmitButton text={'Editar'} />
                  <Button ms={3} onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
