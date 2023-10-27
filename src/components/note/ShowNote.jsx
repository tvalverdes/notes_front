import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SubmitButton } from '../button/SubmitButton'
import { deleteNote, updateNote } from '../../utils/note.utils'
import { useDispatch, useSelector } from 'react-redux'
import { refreshNotes } from '../../redux/refreshNotesSlice'
import { useState } from 'react'
import { FiEdit, FiEye } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

export const ShowNote = ({ id, title, text, isOpen, onClose }) => {
  const dispatch = useDispatch()
  const onNotesRefresh = useSelector((state) => state.refreshNotes)
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const showToast = (title, status) => {
    toast({
      title: title,
      status: status,
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

  const onDelete = async () => {
    const res = await deleteNote(id)
    if (res.status == 204) {
      dispatch(refreshNotes(!onNotesRefresh))
      showToast('¡Nota eliminada!', 'success')
      return onClose()
    }
    showToast('No se pudo eliminar, inténtalo nuevamente', 'error')
  }

  const onSubmit = async (data) => {
    if (errors.title || errors.text) {
      return
    }
    if (data.title !== title || data.text !== text) {
      const res = await updateNote(data)
      if (res.status == 204) {
        dispatch(refreshNotes(!onNotesRefresh))
        showToast('¡Nota modificada!', 'success')
        return onClose()
      }
      showToast('No se pudo modificar, inténtalo nuevamente', 'error')
    }
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
          minH={errors.title || errors.text ? 440 : 403}
          maxH={errors.title || errors.text ? 440 : 403}
        >
          <ModalHeader>
            {!isEditing ? title || 'Sin título' : 'Editar nota'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className=" flex flex-col gap-1">
            <div className="flex justify-end gap-6 sm:gap-4 items-center">
              <Button
                color={'yellow.500'}
                bg={'transparent'}
                borderRadius={'full'}
                px={2}
                py={2}
                transition="all 0.2s"
                onClick={() => setIsEditing(!isEditing)}
              >
                {!isEditing ? (
                  <FiEdit className="text-2xl" />
                ) : (
                  <FiEye className="text-2xl" />
                )}
              </Button>
              <Button
                color={'red.600'}
                bg={'transparent'}
                borderRadius={'full'}
                px={2}
                py={2}
                transition="all 0.2s"
                onClick={onDelete}
              >
                <MdDelete className="text-3xl" />
              </Button>
            </div>
            <Divider />
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
