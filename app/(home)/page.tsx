import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  return (
    <div className="overflow-y-auto">
      <Navbar />
      <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <ProductCard price={300} />
        <ProductCard price={300} />
        <ProductCard price={300} />
        <ProductCard price={300} />
        <ProductCard price={300} />
        <ProductCard price={300} />
        <ProductCard price={300} />
        <ProductCard price={300} />
        <ProductCard price={300} />
      </section>
      <Footer />
    </div>
  )
}
