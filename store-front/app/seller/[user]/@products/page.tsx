"use client";
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
  const { data, error, isLoading } = useSWR(`/user/${params.user}`, fetcher);
  return <></>;
}
