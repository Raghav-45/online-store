'use client'

import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import {
  getAllOrderHistory,
  getProductById,
  updateOrderStatus,
} from '@/lib/dbUtils'
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
import { toast } from 'sonner'
import { formatOrderDate } from '@/lib/utils'

interface OrderPageProps {}

const OrderPage: FC<OrderPageProps> = ({}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [allOrders, setAllOrders] = useState<OrderType[]>()
  const [selectedOrder, setSelectedOrder] = useState<OrderType>()
  const [selectedProduct, setSelectedProduct] = useState<ProductTypeWithId>()
  const [selectedFilterStatus, setSelectedFilterStatus] = useState<
    string | null
  >('New')

  const getAllOrders = async () => {
    const data = await getAllOrderHistory()
    return data
  }

  const handleShipButtonClick = async (id: string) => {
    try {
      await updateOrderStatus(id, 'shipping') // Update order status in the database
      // Update local state to reflect the new status
      setAllOrders((prevOrders) =>
        prevOrders!.map((order) =>
          order.paymentId === id ? { ...order, status: 'shipping' } : order
        )
      )
    } catch (error) {
      console.error('Failed to update order status:', error)
      toast.error('Failed to update order status')
    }
  }

  function calculateTotalAmount() {
    if (!allOrders) return 0 // Handle case when allOrders is null or undefined

    // Use reduce to calculate the sum of prices
    const totalAmount = allOrders.reduce((total, order) => {
      // Only add to total if order exists, has a paymentId, matches the selected filter status, and has a valid price
      if (
        order &&
        order.paymentId &&
        order.status === selectedFilterStatus &&
        order.price
      ) {
        return total + order.price
      }
      return total
    }, 0) // Initial value of total is 0

    return totalAmount
  }

  const handleActionButtonClick = async (
    id: string,
    newStatus: orderStatusType
  ) => {
    try {
      await updateOrderStatus(id, newStatus) // Update order status in the database
      // Update local state to reflect the new status
      setAllOrders((prevOrders) =>
        prevOrders!.map((order) =>
          order.paymentId === id ? { ...order, status: newStatus } : order
        )
      )
    } catch (error) {
      console.error('Failed to update order status:', error)
      toast.error('Failed to update order status')
    } finally {
      setIsDrawerOpen(false)
    }
  }

  useEffect(() => {
    selectedOrder &&
      selectedOrder?.productId &&
      getProductById(selectedOrder?.productId).then((e) =>
        setSelectedProduct(e!)
      )
  }, [selectedOrder])

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

          <Tabs
            onValueChange={(e) => setSelectedFilterStatus(e)}
            defaultValue="New"
            className="w-auto"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger className="text-xs" value="New">
                New Order
              </TabsTrigger>
              <TabsTrigger className="text-xs" value="shipping">
                Shipping
              </TabsTrigger>
              <TabsTrigger className="text-xs" value="completed">
                Completed
              </TabsTrigger>
              <TabsTrigger className="text-xs" value="cancelled">
                Cancelled
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Table>
            <TableCaption>A list of your recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Drawer
                open={isDrawerOpen}
                onOpenChange={(isOpen: boolean) => {
                  setIsDrawerOpen(isOpen)
                }}
              >
                {allOrders &&
                  allOrders.map(
                    (e) =>
                      e &&
                      e.paymentId &&
                      e.status == selectedFilterStatus && (
                        <DrawerTrigger key={e.paymentId} asChild>
                          <TableRow onClick={() => setSelectedOrder(e)}>
                            <TableCell className="text-xs font-medium">
                              {e.paymentId}
                            </TableCell>
                            <TableCell className="text-xs">Online</TableCell>
                            <TableCell className="text-xs text-right">
                              {/* $250.00 */}
                              {e.price} INR
                            </TableCell>
                          </TableRow>
                        </DrawerTrigger>
                      )
                  )}

                <DrawerContent>
                  <DrawerHeader>
                    <div className="flex justify-between pb-2 items-center">
                      <h3 className="text-xl font-semibold leading-none tracking-tight pl-0.5">
                        Order Details
                      </h3>
                      <DrawerClose>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 md:hidden bg-neutral-900 border-neutral-700 text-white"
                        >
                          <PlusIcon className="h-5 w-5 rotate-45" />
                        </Button>
                      </DrawerClose>
                    </div>

                    <div className="flex gap-x-4 pb-4">
                      <div className="border w-1/3 aspect-square rounded-2xl content-center">
                        <img
                          // src="https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-1.png"
                          src={
                            selectedProduct?.image ??
                            'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-1.png'
                          }
                          alt="Product Image"
                        />
                      </div>
                      <div className="flex flex-col w-2/3 text-left py-2.5 gap-y-1.5">
                        <div className="w-full pr-2">
                          <h3 className="text-lg font-extrabold line-clamp-2 leading-none tracking-tight text-ellipsis overflow-hidden">
                            {selectedOrder?.productName ?? 'Shoes'}
                          </h3>
                        </div>
                        <ol>
                          <li className="text-xs mb-1 leading-none tracking-wide font-semibold">
                            Colour: green
                          </li>
                          <li className="text-xs mb-1 leading-none tracking-wide font-semibold">
                            Size: 12
                          </li>
                          <li className="text-xs mb-1 leading-none tracking-wide font-semibold">
                            Qty: 1
                          </li>
                        </ol>
                      </div>
                    </div>

                    <div className="flex flex-col gap-y-2 text-left">
                      <div className="flex gap-x-2">
                        <div className="grid w-full items-center gap-y-0.5">
                          <Label className="text-xs ml-0.5" htmlFor="email">
                            Full Name
                          </Label>
                          <Input
                            value={selectedOrder?.shippingAddress.fullName}
                            type="text"
                            placeholder={
                              selectedOrder?.shippingAddress.fullName
                            }
                            disabled
                          />
                        </div>
                        <div className="grid w-full items-center gap-y-0.5">
                          <Label className="text-xs ml-0.5" htmlFor="email">
                            Primary Contact
                          </Label>
                          <Input
                            value={selectedOrder?.shippingAddress.Contact}
                            type="text"
                            placeholder={selectedOrder?.shippingAddress.Contact}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="grid w-full items-center gap-y-0.5">
                        <Label className="text-xs ml-0.5" htmlFor="email">
                          Shipping Address
                        </Label>
                        <Textarea
                          // value="A-105, Shivaji Vihar, Rajouri Garden, Rajouri Garden, Rajouri Garden, Rajouri Garden, New Delhi 110027"
                          value={`${selectedOrder?.shippingAddress.addressLine1} | ${selectedOrder?.shippingAddress.addressLine2} | ${selectedOrder?.shippingAddress.nearby}`}
                          className="resize-none"
                          rows={3}
                          disabled
                        />
                      </div>

                      <div className="flex gap-x-2">
                        <div className="grid w-full items-center gap-y-0.5">
                          <Label className="text-xs ml-0.5" htmlFor="email">
                            State
                          </Label>
                          <Input
                            value={selectedOrder?.shippingAddress.state}
                            type="text"
                            placeholder={selectedOrder?.shippingAddress.state}
                            disabled
                          />
                        </div>
                        <div className="grid w-full items-center gap-y-0.5">
                          <Label className="text-xs ml-0.5" htmlFor="email">
                            City
                          </Label>
                          <Input
                            value={selectedOrder?.shippingAddress.city}
                            type="text"
                            placeholder={selectedOrder?.shippingAddress.city}
                            disabled
                          />
                        </div>
                      </div>

                      {/* <div className="flex gap-x-2">
                        <div className="grid w-full items-center gap-1.5">
                          <Label className="ml-1" htmlFor="email">
                            Primary Contact
                          </Label>
                          <Input
                            value={'9315988300'}
                            type="text"
                            placeholder={'9315988300'}
                            disabled
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                          <Label className="ml-1" htmlFor="email">
                            Alternate Contact
                          </Label>
                          <Input
                            value={'1234567890'}
                            type="text"
                            placeholder={'1234567890'}
                            disabled
                          />
                        </div>
                      </div> */}

                      {/* <div className="grid w-full items-center gap-1.5">
                        <Label className="ml-1" htmlFor="email">
                          Payment Id
                        </Label>
                        <InputWithCopyButton text={selectedOrder?.paymentId} />
                      </div> */}

                      <div className="grid w-full items-center gap-0.5">
                        <Label className="text-xs ml-0.5" htmlFor="email">
                          Order Id
                        </Label>
                        <InputWithCopyButton text={selectedOrder?.orderId} />
                      </div>

                      {/* <div className="grid w-full items-center gap-1.5">
                        <Label className="ml-1" htmlFor="email">
                          Product Id
                        </Label>
                        <InputWithCopyButton text={selectedOrder?.productId} />
                      </div> */}
                    </div>
                  </DrawerHeader>
                  <DrawerFooter className="pt-0">
                    {selectedOrder?.paymentId && (
                      <div className="flex gap-x-2">
                        {selectedOrder?.status != 'completed' &&
                          selectedOrder?.status != 'cancelled' && (
                            <Button
                              onClick={() =>
                                handleActionButtonClick(
                                  selectedOrder?.paymentId,
                                  'cancelled'
                                )
                              }
                              className="w-full bg-red-500"
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          )}

                        {selectedOrder?.status == 'New' && (
                          <Button
                            onClick={() =>
                              handleActionButtonClick(
                                selectedOrder?.paymentId,
                                'shipping'
                              )
                            }
                            className="w-full bg-blue-500"
                            variant="outline"
                          >
                            Ship
                          </Button>
                        )}

                        {selectedOrder?.status == 'shipping' && (
                          <Button
                            onClick={() =>
                              handleActionButtonClick(
                                selectedOrder?.paymentId,
                                'completed'
                              )
                            }
                            className="w-full bg-blue-500"
                            variant="outline"
                          >
                            Delivered / Completed
                          </Button>
                        )}
                      </div>
                    )}
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-xs" colSpan={2}>
                  Total
                </TableCell>
                {/* <TableCell className="text-xs text-right">500 INR</TableCell> */}
                <TableCell className="text-xs text-right">
                  {calculateTotalAmount()} INR
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {/* <Select onValueChange={(e) => setSelectedFilterStatus(e)}>
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
            </Select> */}
        </div>
      </section>
    </div>
  )
}

export default OrderPage
