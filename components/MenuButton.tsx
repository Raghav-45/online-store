'use client'

import { FC } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { DrawerClose } from '@/components/ui/drawer'
import { Button } from './ui/button'
import { AlignJustifyIcon, PlusIcon } from 'lucide-react'
import { Input } from './ui/input'

interface MenuButtonProps {}

const MenuButton: FC<MenuButtonProps> = ({}) => {
  return (
    <DrawerPrimitive.Root direction="left">
      <DrawerPrimitive.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 md:hidden bg-neutral-900 border-neutral-700 text-white"
        >
          <AlignJustifyIcon className="h-3.5 w-3.5" />
        </Button>
      </DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-white/5" />
        <DrawerPrimitive.Content className="fixed inset-x-0 z-50 mt-24 flex flex-col rounded-t-[10px] border bg-background h-full w-full bottom-0 right-0">
          {/* <Button>Submit</Button> */}
          <div className="flex flex-col p-4 gap-y-4">
            <DrawerClose className="flex">
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 md:hidden bg-neutral-900 border-neutral-700 text-white"
              >
                <PlusIcon className="h-6 w-6 rotate-45" />
              </Button>
            </DrawerClose>

            <Input
              type="search"
              placeholder="Search for products..."
              className="text-md h-10 w-full rounded-lg border bg-white px-4 py-5 border-neutral-800 bg-transparent text-white placeholder:text-neutral-400"
            />
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}

export default MenuButton
