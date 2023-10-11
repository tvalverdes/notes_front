import UseAnimations from 'react-useanimations'
import menu2 from 'react-useanimations/lib/menu2'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineUser } from 'react-icons/ai'
import { useState } from 'react'

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
    <header className="container mx-auto">
      <nav className="bg-slate-500 flex justify-between items-center p-4">
        <p>LOGO</p>
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
