"use client";
import ProductList from "@/components/ProductList";
import api from "@/config/api";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((res: any) => res.data);
export default function ProductSearch() {
  const queries = useSearchParams();
  const key = queries.get("key");
  const { data, error, isLoading } = useSWR(
    `product?name=${key || ""}`,
    fetcher
  );
  if (isLoading) return <div></div>;
  return (
    <>
      <h2 className="text-xl font-bold">Products</h2>
      <ProductList products={data} />
    </>
  );
}
