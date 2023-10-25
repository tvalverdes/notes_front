import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'

export const NoteCard = () => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text pt="2" fontSize="sm" className="text-primary-500">
              View a summary of all your clients over the last month.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}
