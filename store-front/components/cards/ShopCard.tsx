"use client";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

import api from "@/config/api";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";

export default function ShopCard({ shop }: { shop: any }) {
  const { data, isLoading, error } = useSWR(
    `/product?owner=${shop._id}`,
    fetcher
  );
  return (
    <div className="flex justify-between px-10 py-5 bg-gray-100 rounded-xl items-center shadow-md">
      <div className="flex align-center flex-col w-1/3">
        <img
          src={
            shop.image ||
            "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
          }
          className="w-20 h-20 rounded-full"
        />
        <h2 className="font-semibold text-md ml-2">
          {shop.name || shop.email}
        </h2>
      </div>
      <div className="flex text-gray-500 items-center gap-2">
        <div className="flex items-center flex-col p-2">
          <StarIcon className="h-7 w-7 text-yellow-400" />
          <p>{`Rating: ${shop.rating || 5}`}</p>
        </div>
        <div className="h-[50px] w-[3px] bg-red-300 rounded-full "></div>
        <div className="flex items-center flex-col p-2">
          <ShoppingBagIcon className="h-7 w-7 text-green-400" />
          <p>{`Products: ${data?.length || 0}`}</p>
        </div>
      </div>
      <a
        href={`/seller/${shop._id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Shop now
      </a>
    </div>
  );
}
