'use client'

import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { getAllOrderHistory } from '@/lib/dbUtils'
import { FC, useEffect, useState } from 'react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface OrderPageProps {}

const OrderPage: FC<OrderPageProps> = ({}) => {
  const [allOrders, setAllOrders] = useState<OrderType[]>()
  const [selectedOrder, setSelectedOrder] = useState<OrderType>()

  const getAllOrders = async () => {
    const data = await getAllOrderHistory()
    return data
  }
  
  useEffect(() => {
    !allOrders && getAllOrders().then((e) => setAllOrders(e))
  }, [])
  return (
    <div className="overflow-y-auto">
      <Navbar />
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-4">
          Order History
        </h1>

        <div className="flex flex-col space-y-4">
          <Input
            // value={productNameInput}
            // onChange={(e) => setProductNameInput(e.target.value)}
            type="text"
            placeholder="Search Product"
          />

          <div className="w-full h-auto">
          <Drawer>
            {/* <DrawerTrigger asChild>Open</DrawerTrigger> */}
            {allOrders && allOrders.map((e) => (
              <DrawerTrigger asChild>
                <div
                  onClick={()=> setSelectedOrder(e)}
                  key={e.paymentId}
                  className="w-full rounded-lg h-10 bg-neutral-800 items-center flex justify-between px-4 mb-2"
                >
                  <p className="text-sm">{e.paymentId}</p>
                  <p className="text-sm">{e.price} INR</p>
                </div>
              </DrawerTrigger>
            ))}
            <DrawerContent>
              <DrawerHeader>
                <div className='flex justify-between pb-4'>
                  <h3 className='text-lg font-semibold leading-none tracking-tight'>{selectedOrder?.paymentId ?? "NA"}</h3>
                  <h3>{selectedOrder?.price ?? "X"} INR</h3>
                </div>
                <div className='flex flex-col gap-y-4 text-left'>
                  
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="ml-1" htmlFor="email">Payment Id</Label>
                    <Input
                      value={selectedOrder?.paymentId}
                      type="text"
                      placeholder={selectedOrder?.paymentId}
                      disabled
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label className="ml-1" htmlFor="email">Order Id</Label>
                    <Input
                      value={selectedOrder?.orderId}
                      type="text"
                      placeholder={selectedOrder?.orderId}
                      disabled
                    />
                  </div>

                  <div className="grid w-full items-center gap-1.5">
                    <Label className="ml-1" htmlFor="email">Product Id</Label>
                    <Input
                      value={selectedOrder?.productId}
                      type="text"
                      placeholder={selectedOrder?.productId}
                      disabled
                    />
                  </div>
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <Link href={`/products/${selectedOrder?.productId}`}>
                  <Button className='w-full'>Visit Product Page</Button>
                </Link>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          </div>

          {/* <Drawer>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer> */}
        </div>
      </section>
    </div>
  )
}

export default OrderPage
