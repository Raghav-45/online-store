'use client'

import Script from 'next/script'
import { FC } from 'react'
import { Button } from './ui/button'
import { Input } from '@/components/ui/input'
import { createOrderHistory } from '@/lib/dbUtils'
import { LocateIcon } from 'lucide-react'

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

import { useState } from 'react'
import axios from 'axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  contact: z.string().min(9).max(13),
  pincode: z.string().max(6, { message: 'Pincode must be 6 digits long' }),
  state: z.string(),
  city: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  nearby: z.string(),
})

interface CheckoutButtonProps {
  amount: number
  productObject: ProductTypeWithId
  info: string
}

const CheckoutButton: FC<CheckoutButtonProps> = ({
  amount,
  productObject,
  info,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contact: '',
      pincode: '',
      state: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      nearby: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setIsDrawerOpen(false)
    await processPayment(values)
  }

  const createOrderId = async () => {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      return data.orderId
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error)
    }
  }

  const processPayment = async (formData: z.infer<typeof formSchema>) => {
    // e.preventDefault()
    try {
      const orderId: string = await createOrderId()
      const options = {
        key: process.env.razorpay_key_id,
        amount: amount * 100,
        currency: 'INR',
        name: 'Online Store',
        image: 'https://mev-web-app.vercel.app/icon-192x192.png',
        // description: info,
        description: `Product Id: ${productObject.id ?? 'NA'}`,
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }

          createOrderHistory({
            paymentId: data.razorpayPaymentId,
            orderId: data.razorpayOrderId,
            productId: productObject.id,
            productName: productObject.name,
            price: productObject.price,
            shippingAddress: {
              fullName: formData.name ?? 'NA',
              Contact: formData.contact ?? 'NA',
              addressLine1: formData.addressLine1 ?? 'NA',
              addressLine2: formData.addressLine2 ?? 'NA',
              nearby: formData.nearby ?? 'NA',
              state: formData.state ?? 'New Delhi',
              city: formData.city ?? 'Delhi',
              postalCode: formData.pincode ?? 'NA',
            },
          })

          // const result = await fetch('/api/verify', {
          //   method: 'POST',
          //   body: JSON.stringify(data),
          //   headers: { 'Content-Type': 'application/json' },
          // })
          // const res = await result.json()
          // if (res.isOk) alert('payment succeed')
          // else {
          //   alert(res.message)
          // }
        },
        prefill: {
          name: formData.name,
          contact: formData.contact,
        },
        notes: {
          // 'Product Id': productObject.id ?? 'NA',
          // 'Product Name': productObject.name ?? 'NA',
          'Customer Name': formData.name ?? 'NA',
          'customer Contact': formData.contact ?? 'NA',
        },
        theme: {
          //   color: '#3399cc',
          color: '#000000',
        },
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.on('payment.failed', function (response: any) {
        alert(response.error.description)
      })
      paymentObject.open()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // <>
    //   <Script
    //     id="razorpay-checkout-js"
    //     src="https://checkout.razorpay.com/v1/checkout.js"
    //   />
    //   <Button
    //     onClick={processPayment}
    //     className="w-full rounded-2xl h-10 bg-blue-600 text-white"
    //   >
    //     Proceed to Checkout
    //   </Button>
    // </>

    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Drawer
        open={isDrawerOpen}
        onOpenChange={(isOpen: boolean) => {
          setIsDrawerOpen(isOpen)
        }}
      >
        <DrawerTrigger asChild>
          <Button
            // onClick={processPayment}
            className="w-full rounded-2xl h-10 bg-blue-600 text-white"
          >
            Proceed to Checkout
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Please Provide Details</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-1 px-4"
              autoComplete="on"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="ml-0.5 text-xs">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-700"
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="ml-0.5 text-xs">Contact</FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-700"
                        placeholder="1234567890"
                        autoComplete="mobile tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 w-full">
                    <FormLabel className="ml-0.5 text-xs">Pincode</FormLabel>
                    <FormControl>
                      <div className="flex gap-x-4">
                        <Input
                          className="border-neutral-700 w-full"
                          type="text"
                          id="name"
                          placeholder="110001"
                          autoComplete="postal-code"
                          {...field}
                        />
                        <Button className="w-full">
                          <LocateIcon className="mr-1.5 h-4 w-4" /> Use my
                          location
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-x-4 justify-between">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 w-full">
                      <FormLabel className="ml-0.5 text-xs">State</FormLabel>
                      <FormControl>
                        <Input
                          className="border-neutral-700"
                          type="text"
                          id="name"
                          placeholder="New Delhi"
                          autoComplete="address-level1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 w-full">
                      <FormLabel className="ml-0.5 text-xs">City</FormLabel>
                      <FormControl>
                        <Input
                          className="border-neutral-700"
                          type="text"
                          id="name"
                          placeholder="Delhi"
                          autoComplete="address-level2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="ml-0.5 text-xs">
                      House No., Building Name (Required)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-700"
                        type="text"
                        id="name"
                        placeholder=""
                        autoComplete="address-line1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="ml-0.5 text-xs">
                      Road name, Area, Colony (Required)
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-700"
                        type="text"
                        id="name"
                        placeholder=""
                        autoComplete="address-line2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nearby"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel className="ml-0.5 text-xs">
                      Add Nearby Famous Shop / Mall / Landmark
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-neutral-700"
                        type="text"
                        id="name"
                        placeholder=""
                        autoComplete="address-line3"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pb-6 pt-2">
                <Button className="w-full" type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CheckoutButton
