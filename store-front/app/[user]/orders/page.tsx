"use client";
import OrderCard from "@/components/cards/OrderCard";
import api from "@/config/api";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function Orders({
  params,
}: {
  params: {
    user: string;
  };
}) {
  const { data, error, isLoading } = useSWR(
    `/order?user=${params.user}`,
    fetcher
  );
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <h2 className="font-bold text-xl">Orders</h2>
      {data?.map((order: any) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </>
  );
}
