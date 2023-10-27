import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import { Avatar } from '@chakra-ui/react'
import { ProfileMenu } from '../logout/ProfileMenu'

const links = [
  {
    text: 'Nosotros',
    url: '/nosotros',
  },
  {
    text: 'Contacto',
    url: '/algo',
  },
]

export const Navbar = () => {
  const [checked, setChecked] = useState(true)
  return (
    <header className="bg-primary-600 w-full px-8">
      <nav className=" flex justify-between items-center p-4">
        <Avatar name="Logo" size="lg" src="logo.png" />
        <ul className="hidden md:flex gap-6">
          {/* {links.map((link) => (
            <li key={link.text} className="text-secondary-50">
              {link.text}
            </li>
          ))} */}
        </ul>
        <GiHamburgerMenu className="md:hidden text-xl" />
        <ProfileMenu />
      </nav>
    </header>
  )
}
