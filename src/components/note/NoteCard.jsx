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

export const NoteCard = ({ title, text }) => {
  return (
    <Card>
      <CardHeader>
        <Heading noOfLines={1} size="md">
          {title}
        </Heading>
        <Divider className="pt-2 -mb-8" />
      </CardHeader>
      <CardBody>
        <Text noOfLines={1} pt="2" fontSize="sm" className="text-primary-500">
          {text}
        </Text>
      </CardBody>
    </Card>
  )
}
