'use client';

import Nav from "@/components/Nav";
import useSWR from "swr";
import api from "@/config/api";
import ProductList from "@/components/ProductList";
import CTA from "@/components/CTA";

export default function Home() {
  const fetcher = (url: string) => api.get(url).then((res: any) => res.data);
  const {data, error, isLoading} = useSWR("/product?limit=10&sortField=createdAt&sort=dsc", fetcher);
  //console.log(data);
  return (
    <>
      <Nav></Nav>
      <div className="mx-20">
        <h1 className="mt-5 font-bold text-3xl">New Arrival</h1>
        <ProductList products={data}/>
      </div>
      <CTA/>
    </>
  );
}
