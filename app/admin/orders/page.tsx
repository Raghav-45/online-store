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

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import CopyToClipboardButton from '@/components/CopyButton'
import InputWithCopyButton from '@/components/InputWithCopyButton'

interface OrderPageProps { }

const OrderPage: FC<OrderPageProps> = ({ }) => {
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

          <Tabs defaultValue="new-order" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger className="text-xs" value="new-order">New Order</TabsTrigger>
              <TabsTrigger className="text-xs" value="shipping">Shipping</TabsTrigger>
              <TabsTrigger className="text-xs" value="completed">Completed</TabsTrigger>
              <TabsTrigger className="text-xs" value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="new-order">
              <div className="w-full h-auto">
                <Drawer>
                  {allOrders && allOrders.map((e) => (
                    <DrawerTrigger key={e.paymentId} asChild>
                      <div
                        onClick={() => setSelectedOrder(e)}
                        className="w-full rounded-lg h-10 bg-neutral-800 items-center flex justify-between px-4 mb-2"
                      >
                        <p className="text-xs">{e.paymentId}</p>
                        <p className="text-xs">{e.price} INR</p>
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
                          <InputWithCopyButton text={selectedOrder?.paymentId} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                          <Label className="ml-1" htmlFor="email">Order Id</Label>
                          <InputWithCopyButton text={selectedOrder?.orderId} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                          <Label className="ml-1" htmlFor="email">Product Id</Label>
                          <InputWithCopyButton text={selectedOrder?.productId} />
                        </div>
                      </div>
                    </DrawerHeader>
                    <DrawerFooter>
                      <div className='flex gap-x-2'>
                        <Button className='w-1/2 bg-red-500' variant="outline">Cancel</Button>
                        {/* <Link className='w-full' href={`/product/${selectedOrder?.productId}`}>
                          <Button className='w-full'>Visit Product Page</Button>
                        </Link> */}
                        <Button className='w-1/2 bg-blue-500' variant="outline">Ship</Button>
                      </div>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </TabsContent>
            <TabsContent value="shipping">
              <div className="w-full h-auto">
                <Drawer>
                  {allOrders && allOrders.slice(1, 4).map((e) => (
                    <DrawerTrigger key={e.paymentId} asChild>
                      <div
                        onClick={() => setSelectedOrder(e)}
                        className="w-full rounded-lg h-10 bg-neutral-800 items-center flex justify-between px-4 mb-2"
                      >
                        <p className="text-xs">{e.paymentId}</p>
                        <p className="text-xs">{e.price} INR</p>
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
                          <InputWithCopyButton text={selectedOrder?.paymentId} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                          <Label className="ml-1" htmlFor="email">Order Id</Label>
                          <InputWithCopyButton text={selectedOrder?.orderId} />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                          <Label className="ml-1" htmlFor="email">Product Id</Label>
                          <InputWithCopyButton text={selectedOrder?.productId} />
                        </div>
                      </div>
                    </DrawerHeader>
                    <DrawerFooter>
                      {/* <Link href={`/product/${selectedOrder?.productId}`}> */}
                        <Button className='w-full'>Delivered</Button>
                      {/* </Link> */}
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

export default OrderPage
