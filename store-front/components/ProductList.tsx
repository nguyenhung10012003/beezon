import ProductCard from "@/components/cards/ProductCard";

export default function ProductList({products}: {
  products: any[]
}) {
  return (
    <div className="flex flex-row gap-5 flex-wrap">
      {products?.map((product: any) => {
        return (
          <ProductCard product={product} key={product._id}></ProductCard>
        )
      })}
    </div>
  )
}