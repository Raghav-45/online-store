import { FC } from 'react'
import { Badge } from './ui/badge'

interface ProductCardProps {
  name: string
  description: string
  image: string
  price?: number
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  description,
  image,
  price,
}) => {
  return (
    <div className="md:col-span-4 md:row-span-2">
      <div className="group flex h-auto w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
        <img
          alt="Acme Circles T-Shirt"
          className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
          src={image}
        />
        <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label lg:px-20 lg:pb-[35%]">
          <div className="flex items-center rounded-full border p-1 text-xs font-semibold border-neutral-800 bg-black/70 text-white">
            <h3 className="mr-4 line-clamp-2 flex-grow pl-2 text-md leading-none tracking-tight">
              {name ?? 'Acme Circles T-Shirt'}
            </h3>
            <Badge className="rounded-full bg-blue-600 text-white">
              ₹{price ?? '169'} INR
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
