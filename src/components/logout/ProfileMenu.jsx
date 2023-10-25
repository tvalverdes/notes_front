import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { enableNotes } from '../../redux/enableNotesSlice'
import { useCookies } from 'react-cookie'
import { logout } from '../../utils/auth.utils'

export const ProfileMenu = () => {
  const dispatch = useDispatch()
  const logoutUser = () => {
    logout()
    dispatch(enableNotes(false))
  }

  return (
    <Menu>
      <MenuButton
        px={2}
        py={2}
        transition="all 0.2s"
        borderRadius="full"
        _hover={{ bg: 'gray.600' }}
        _expanded={{ bg: 'blue.700' }}
      >
        <AiOutlineUser className="text-secondary-50 text-2xl" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logoutUser}>Cerrar sesión</MenuItem>
      </MenuList>
    </Menu>
  )
}
