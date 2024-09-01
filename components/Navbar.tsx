import { FC } from 'react'
import { Button } from './ui/button'
import {
  AlignJustifyIcon,
  FootprintsIcon,
  ShoppingCartIcon,
} from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 md:hidden bg-neutral-900 border-neutral-700 text-white"
        >
          <AlignJustifyIcon className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <div className="flex flex-none items-center justify-center border border-neutral-700 bg-black h-[40px] w-[40px] rounded-xl">
              <FootprintsIcon className="h-4 w-4" />
            </div>
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              Online Store
            </div>
          </Link>
        </div>
        <div className="flex justify-end md:w-1/3">
          <Button
            variant="outline"
            size="icon"
            className="relative h-11 w-11 md:hidden bg-neutral-900 border-neutral-700 text-white"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 inline-flex items-center justify-center content-center rounded bg-blue-600 text-[10px] font-medium text-white">
              1
            </div>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
