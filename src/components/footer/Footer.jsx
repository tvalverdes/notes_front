import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { IoIosMail } from 'react-icons/io'
import { FaWhatsappSquare } from 'react-icons/fa'
import { Divider, Link, Stack, Text } from '@chakra-ui/react'

export const Footer = () => {
  const iconSize = 'text-2xl md:text-3xl hover:scale-125 transition-all'
  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/tvalverdes',
      icon: <BsGithub className={iconSize} />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tvalverdes/',
      icon: <BsLinkedin className={iconSize} />,
    },
    {
      name: 'Gmail',
      url: 'mailto:tvalverdes9@gmail.com?subject=Contacto%20desde%Notly',
      icon: <IoIosMail className={iconSize} />,
    },
    {
      name: 'Whatsapp',
      url: 'https://wa.me/51936071037?text=Hola,%20vengo%20desde%20Notly.%20Me%20gustar%C3%ADa%20conversar%20contigo',
      icon: <FaWhatsappSquare className={iconSize} />,
    },
  ]

  return (
    <footer className="bg-primary-600 w-full z-0 gap-12 sm:gap-4 footer absolute grid grid-cols-1 sm:grid-cols-3 bottom-0 text-primary-50 text-lg px-8 p-4">
      <div>
        Contacto:
        <div className="flex sm:grid sm:grid-cols-2 lg:flex w-fit gap-4">
          {socials.map((social) => {
            return (
              <Link
                key={social.name}
                size={'lg'}
                bg={'transparent'}
                title={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                textColor={'yellow.500'}
                px={2}
                py={2}
                transition="all 0.2s"
                borderRadius="full"
                _expanded={{ bg: 'blue.700' }}
              >
                {social.icon}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex items-end justify-start pb-4 sm:justify-center">
        <>&copy; {new Date().getFullYear()} por Tyrone Valverde</>
      </div>
      <div className="flex gap-2 h-fit">
        <Stack direction="row" className="h-auto">
          <Divider orientation="vertical" />
          <Text as={'cite'}>Si crees que puedes, ya estás a medio camino</Text>
        </Stack>
      </div>
    </footer>
  )
}
