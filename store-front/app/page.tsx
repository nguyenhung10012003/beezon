"use client";

import Banner from "@/components/Banner";
import CTA from "@/components/CTA";
import Categories from "@/components/Categories";
import Nav from "@/components/Nav";
import ProductList from "@/components/ProductList";
import api from "@/config/api";
import useSWR from "swr";

export default function Home() {
  const fetcher = (url: string) => api.get(url).then((res: any) => res.data);
  const { data, error, isLoading } = useSWR(
    "/product?limit=10&sortField=createdAt&sort=dsc",
    fetcher
  );
  //console.log(data);
  return (
    <>
      <Nav></Nav>
      <div className="mx-20">
        <Banner />
        <h1 className="mt-5 font-bold text-3xl">New Arrival</h1>
        <ProductList products={data} />
        <h1 className="mt-5 font-bold text-3xl">Shop by categories</h1>
        <Categories />
      </div>
      <CTA />
    </>
  );
}
