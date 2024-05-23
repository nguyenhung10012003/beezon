"use client";
import { useSearchParams } from "next/navigation";
import api from "@/config/api";
import useSWR from "swr";
import ProductList from "@/components/ProductList";

const fetcher = (url: string) => api.get(url).then((res: any) => res.data);
export default function ProductSearch() {
  const queries = useSearchParams();
  const key = queries.get("key");
  const { data, error, isLoading } = useSWR(
    `product?name=${key || ""}`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h2 className="text-xl font-bold">Products</h2>
      <ProductList products={data} />
    </>
  );
}
