import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAllProducts, getProductById } from '@/lib/dbUtils'
import { PlusIcon } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export default async function Page({ params }: { params: { slug: string } }) {
  const allProducts = await getAllProducts()
  const currentProduct = await getProductById(params.slug)
  return (
    <div className="overflow-y-auto">
      <Navbar />
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <div className="group flex flex-col h-auto w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
          <img
            alt="Acme Circles T-Shirt"
            className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
            src={currentProduct?.image}
          />

          <div className="flex flex-col gap-y-2 pl-5 pt-2 self-start">
            <h3 className="mr-4 line-clamp-2 flex-grow text-4xl font-extrabold tracking-tight">
              {currentProduct?.name}
            </h3>
            <div>
              <Badge className="rounded-full bg-blue-600 text-white">
                ₹{currentProduct?.price} INR
              </Badge>
            </div>
            <p className="mr-4 line-clamp-4 flex-grow text-md leading-6">
              {currentProduct?.description}
            </p>
          </div>
          <div className="w-full px-5">
            <div className="border-b h-px w-full bg-neutral-700 my-5" />
          </div>

          <div className="px-5 mb-5 w-full">
            <Button className="relative w-full rounded-full h-10 bg-blue-600 text-white">
              <PlusIcon className="absolute left-0 ml-2.5 h-6 w-6" />
              Add to Cart
            </Button>
          </div>
        </div>
      </section>
      <h2 className="pl-5 scroll-m-20 text-3xl font-extrabold tracking-tight pb-4">
        Related Products
      </h2>
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <Carousel
          opts={{
            align: 'center',
          }}
        >
          <CarouselContent>
            {allProducts.map((product) => (
              <CarouselItem key={product.id} className="basis-[87%]">
                <ProductCard
                  name={product.name}
                  description={product.description}
                  image={product.image!}
                  price={product.price}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <Footer />
    </div>
  )
}
