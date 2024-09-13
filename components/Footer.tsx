import { FootprintsIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface FooterProps {}

const links = [
  'Home',
  'About',
  'Terms Conditions',
  'Shipping Return Policy',
  'Privacy Policy',
  'FAQ',
]

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <Link
          href="/"
          //   className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
        >
          <div className="flex flex-none items-center justify-center border border-neutral-700 bg-black h-[40px] w-[40px] rounded-xl">
            <FootprintsIcon className="h-4 w-4" />
          </div>
          <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
            Online Store
          </div>
        </Link>

        <nav>
          <ul>
            {/* <li>
              <a
                className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300 text-black dark:text-neutral-300"
                href="/"
              >
                
              </a>
            </li> */}

            {links.map((e) => (
              <li>
                <a
                  className="block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300"
                  href="/about"
                >
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>© 2024 Online Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
