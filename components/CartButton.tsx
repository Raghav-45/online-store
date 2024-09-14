'use client'

import { FC } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { DrawerClose } from '@/components/ui/drawer'
import { Button } from './ui/button'
import { PlusIcon, ShoppingCartIcon } from 'lucide-react'
import CartItem from './CartItem'
import CheckoutButton from './CheckoutButton'

interface CartButtonProps {}

const CartButton: FC<CartButtonProps> = ({}) => {
  return (
    <DrawerPrimitive.Root direction="right">
      <DrawerPrimitive.Trigger asChild>
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
      </DrawerPrimitive.Trigger>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 bg-white/5" />
        <DrawerPrimitive.Content className="fixed inset-x-0 z-50 mt-24 flex flex-col rounded-t-[10px] border bg-background h-full w-full bottom-0 right-0">
          {/* <Button>Submit</Button> */}
          <div className="flex flex-col p-4 gap-y-4 h-full justify-between">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">My Cart</p>
              <DrawerClose>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 md:hidden bg-neutral-900 border-neutral-700 text-white"
                >
                  <PlusIcon className="h-6 w-6 rotate-45" />
                </Button>
              </DrawerClose>
            </div>

            {/* <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
              <ShoppingCartIcon className="h-20 w-20" />
              <p className="mt-6 text-center text-2xl font-bold">
                Your cart is empty.
              </p>
            </div> */}

            <div className="h-full">
              <CartItem />
            </div>

            <div className="mx-2">
              <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400 bottom-0 w-full">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                  <p>Taxes</p>
                  <p className="text-right text-xl text-black dark:text-white">
                    ₹0.00<span className="ml-1 inline">INR</span>
                  </p>
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Shipping</p>
                  <p className="text-right text-md">Calculated at checkout</p>
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <p className="text-right text-xl text-black dark:text-white">
                    ₹45.00<span className="ml-1 inline">INR</span>
                  </p>
                </div>
              </div>

              <div className="mx-2 mb-2">
                <Button className="w-full rounded-2xl h-10 bg-blue-600 text-white">
                  Proceed to Checkout
                </Button>
                <CheckoutButton amount={100} />
              </div>
            </div>
          </div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}

export default CartButton
