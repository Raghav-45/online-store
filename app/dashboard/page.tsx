'use client'

import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { getAllOrderHistory } from '@/lib/dbUtils'
import { FC, useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import CopyToClipboardButton from '@/components/CopyButton'
import InputWithCopyButton from '@/components/InputWithCopyButton'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon } from 'lucide-react'
import DetailsForm from '@/components/DetailsForm'

interface OrderPageProps {}

const OrderPage: FC<OrderPageProps> = ({}) => {
  const [allOrders, setAllOrders] = useState<OrderType[]>()
  const [selectedOrder, setSelectedOrder] = useState<OrderType>()
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<
    string | null
  >('all')

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
          <div className="flex gap-x-2">
            <Input
              // value={productNameInput}
              // onChange={(e) => setProductNameInput(e.target.value)}
              type="text"
              placeholder="Search Product"
            />
            <Select onValueChange={(e) => setSelectedFilterStatus(e)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter Status</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new-orders">New Orders</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Method</TableHead>
                <TableHead className="text-right w-[100px]">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders &&
                allOrders.map((e) => (
                  // <DrawerTrigger key={e.paymentId} asChild>
                  <TableRow onClick={() => setSelectedOrder(e)}>
                    <TableCell className="font-medium">
                      {e.paymentId.replace('pay_', '')}
                    </TableCell>
                    {/* <TableCell>Paid</TableCell> */}
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">
                      {/* $250.00 */}
                      {e.price} INR
                    </TableCell>
                  </TableRow>
                  // </DrawerTrigger>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">500 INR</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>
    </div>
  )
}

export default OrderPage
