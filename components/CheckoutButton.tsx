'use client'

import Script from 'next/script'
import { FC } from 'react'
import { Button } from './ui/button'
import { createOrderHistory, PlaylistTypeWithId } from '@/lib/dbUtils'

interface CheckoutButtonProps {
  amount: number
  productObject: PlaylistTypeWithId
  info: string
}

const CheckoutButton: FC<CheckoutButtonProps> = ({
  amount,
  productObject,
  info,
}) => {
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

  const processPayment = async () => {
    // e.preventDefault()
    try {
      const orderId: string = await createOrderId()
      const options = {
        key: process.env.razorpay_key_id,
        amount: amount * 100,
        currency: 'INR',
        name: 'Online Store',
        image: 'https://mev-web-app.vercel.app/icon-192x192.png',
        description: info,
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          }

          createOrderHistory(
            data.razorpayPaymentId,
            data.razorpayOrderId,
            productObject.id,
            productObject.price
          )

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
        // prefill: {
        //   // name: name,
        //   // email: email,
        //   // contact: number,
        // },
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
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Button
        onClick={processPayment}
        className="w-full rounded-2xl h-10 bg-blue-600 text-white"
      >
        Proceed to Checkout
      </Button>
    </>
  )
}

export default CheckoutButton
