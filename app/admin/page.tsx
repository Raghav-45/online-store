'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createProduct } from '@/lib/dbUtils'
import { Loader2Icon, UploadCloudIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const [productNameInput, setProductNameInput] = useState<string>('')
  const [productDescriptionInput, setProductDescriptionInput] =
    useState<string>('')
  const [productPriceInput, setProductPriceInput] = useState<number>(100)

  async function handleSubmit() {
    setIsLoading(true)
    try {
      const playlistId = await createProduct(
        productNameInput,
        productDescriptionInput,
        'https://cdn.shopify.com/s/files/1/0754/3727/7491/files/t-shirt-1.png',
        productPriceInput
      )
      if (playlistId) {
        toast.success('Product created successfully!')
      }
    } catch (error) {
      // display error message to user
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="overflow-y-auto">
      <Navbar />
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-4">
          Dashboard
        </h1>

        <div className="flex flex-col space-y-4">
          <Input
            value={productNameInput}
            onChange={(e) => setProductNameInput(e.target.value)}
            type="text"
            placeholder="Product Name"
          />

          <Textarea
            value={productDescriptionInput}
            onChange={(e) => setProductDescriptionInput(e.target.value)}
            placeholder="Type your product description here."
          />

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-48 border border-white/10 border-dashed rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloudIcon className="h-8 w-8" />
                <p className="mb-1 text-sm text-white/50">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-white/50">SVG, PNG, JPG</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <Input
            value={productPriceInput}
            onChange={(e) => setProductPriceInput(e.target.value)}
            type="text"
            placeholder="Product Name"
          />

          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading && <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />}
            Save changes
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  )
}
