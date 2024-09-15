'use client'

import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { getAllOrderHistory } from '@/lib/dbUtils'
import { FC } from 'react'

interface orderPageProps {}

const orderPage: FC<orderPageProps> = async ({}) => {
  const allOrders = await getAllOrderHistory()
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
            {allOrders.map((e) => (
              <div
                key={e.paymentId}
                className="w-full rounded-lg h-10 bg-neutral-800 items-center flex justify-between px-4 mb-2"
              >
                <p className="text-sm">{e.paymentId}</p>
                <p className="text-sm">{e.price} INR</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default orderPage
