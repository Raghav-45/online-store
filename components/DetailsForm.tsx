'use client'

import { FC } from 'react'
import LocationButton from './LocationButton'
import { LocateIcon } from 'lucide-react'
import { Label } from './ui/label'

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
import { Drawer as DrawerPrimitive } from 'vaul'
import CheckoutButton from './CheckoutButton'

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
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  contact: z
    .string()
    .length(10, { message: 'Contact number must be exactly 10 digits' }),
  pincode: z.string().max(6, { message: 'Pincode must be 6 digits long' }),
  state: z.string(),
  city: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  nearby: z.string(),
})

interface DetailsFormProps {}

const DetailsForm: FC<DetailsFormProps> = ({}) => {
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
    // const url =
    //   'https://docs.google.com/forms/d/e/1FAIpQLSdagciesIauNfxcKGC9zFR0PHUbW32AItee5ZnmqJw1eOxpTw/formResponse'
    // // Prepare the form data
    // const formData = new URLSearchParams({
    //   'entry.359911290': values.name, // Name
    //   'entry.654878237': values.email, // Email
    //   'entry.1045781291': values.contact, // Contact
    //   'entry.839337160': values.message, // Message
    // })
    // try {
    //   await axios.post(url, formData.toString(), {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   })
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // } catch (error) {
    //   if (axios.isAxiosError(error) && error.message === 'Network Error') {
    //     toast.success('Response submitted successfully.')
    //   } else {
    //     toast.error('Submission failed. Please try again.')
    //   }
    // } finally {
    //   setIsDrawerOpen(false)
    // }
    setIsDrawerOpen(false)
  }

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(isOpen: boolean) => {
        setIsDrawerOpen(isOpen)
      }}
    >
      <DrawerTrigger>
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
  )
}

export default DetailsForm
