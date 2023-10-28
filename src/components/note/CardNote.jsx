import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
  Divider,
} from '@chakra-ui/react'
import { ShowNote } from './ShowNote'
import { useState } from 'react'

export const CardNote = ({ id, title, text }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const previewNote = () => {
    setModalOpen(!modalOpen)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      {modalOpen ? (
        <ShowNote
          id={id}
          title={title}
          text={text}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      ) : null}
      <button onClick={previewNote}>
        <Card bg={'yellow.400'} minH={'120'}>
          {title ? (
            <CardHeader>
              <Heading noOfLines={1} size="sm">
                {title}
              </Heading>

              <Divider className="pt-2 -mb-8" />
            </CardHeader>
          ) : null}

          <CardBody>
            <Text
              noOfLines={title ? 1 : 3}
              pt="2"
              fontSize="sm"
              textAlign={'left'}
              className="text-primary-500"
            >
              {text}
            </Text>
          </CardBody>
        </Card>
      </button>
    </>
  )
}
