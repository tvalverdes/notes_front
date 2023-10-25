import UseAnimations from 'react-useanimations'
import menu2 from 'react-useanimations/lib/menu2'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineUser } from 'react-icons/ai'
import { useState } from 'react'
import { Avatar } from '@chakra-ui/react'

const links = [
  {
    text: 'Nosotros',
    url: '/nosotros',
  },
  {
    text: 'Algo',
    url: '/algo',
  },
  {
    text: 'Pruébalo',
    url: '/pruebalo',
  },
]

export const Navbar = () => {
  const [checked, setChecked] = useState(true)
  return (
    <header className="bg-primary-600 container mx-auto">
      <nav className=" flex justify-between items-center p-4">
        <Avatar name="Logo" size="lg" src="logo.png" />
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link}>{link.text}</li>
          ))}
        </ul>
        <GiHamburgerMenu className="md:hidden text-xl" />
        <AiOutlineUser className="text-xl" />
      </nav>
    </header>
  )
}
