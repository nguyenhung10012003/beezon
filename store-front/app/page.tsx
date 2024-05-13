'use client';

import Nav from "@/components/nav";
import ProductCard from "@/components/cards/productCard";
import useSWR from "swr";
import api from "@/config/api";

export default function Home() {
  const fetcher = (url: string) => api.get(url).then((res: any) => res.data);
  const {data, error, isLoading} = useSWR("/product?limit=10&sortField=createdAt&sort=dsc", fetcher);
  //console.log(data);
  return (
    <>
      <Nav></Nav>
      <div className="mx-20">
        <h1 className="mt-5 font-bold text-3xl">New Arrival</h1>
        <div className="flex flex-row gap-5 flex-wrap">
          {data?.map((product: any) => {
            return (
              <ProductCard product={product} key={product._id}></ProductCard>
            )
          })}
        </div>
      </div>
    </>
  );
}
