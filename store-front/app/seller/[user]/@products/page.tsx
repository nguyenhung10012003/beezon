"use client";
import ProductList from "@/components/ProductList";
import api from "@/config/api";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function SellerProducts({
  params,
}: {
  params: {
    user: string;
  };
}) {
  const { data, error, isLoading } = useSWR(
    `/product?owner=${params.user}`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h2 className="font-bold text-lg">Products</h2>
      <ProductList products={data} />
    </>
  );
}
