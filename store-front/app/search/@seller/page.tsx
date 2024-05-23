"use client";
import ShopCard from "@/components/cards/ShopCard";
import api from "@/config/api";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function SellerSearch() {
  const queries = useSearchParams();
  const key = queries.get("key");
  const { data, error, isLoading } = useSWR(
    `/user?name=${key || ""}&limit=10`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h2 className="font-bold text-lg">Suppliers</h2>
      <div className="flex flex-col gap-3">
        {data
          ?.filter((seller: any) => seller.role == "seller")
          .map((seller: any) => (
            <ShopCard key={seller._id} shop={seller} />
          ))}
      </div>
    </>
  );
}
