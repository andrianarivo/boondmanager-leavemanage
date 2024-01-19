import React from 'react'
import {Navbar, NavbarBrand, NavbarContent} from '@nextui-org/react'
import Link from 'next/link'
import HeaderAuth from '@/components/header-auth'

function Header() {
  return (
      <Navbar className="shadow mb-6">
        <NavbarBrand>
          <Link href="/" className="font-bold">Novity</Link>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <HeaderAuth />
        </NavbarContent>
      </Navbar>
  )
}

export default Header