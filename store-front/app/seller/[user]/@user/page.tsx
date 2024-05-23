"use client";
import api from "@/config/api";
import useSWR from "swr";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function SellerProfile({
  params,
}: {
  params: {
    user: string;
  };
}) {
  const { data, error, isLoading } = useSWR(`/user/${params.user}`, fetcher);
  if (isLoading) return <div></div>;
  return (
    <div className="flex py-3 px-5 my-5 border-b-2 gap-2">
      <div className="w-full">
        <img
          src="https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png"
          className="w-20 h-20 rounded-full border border-gray-200 p-1"
        />
        <h2 className="text-lg font-bold">{data.name}</h2>
      </div>
      <div className="flex border-l-2 m-4 p-2 flex-col gap-1 w-full">
        <span className="font-semibold">{`Email: ${data.email}`}</span>
        <span className="font-semibold">{`Phone: ${
          data.phone || "xxxxxxxxx"
        }`}</span>
      </div>
      <div className="flex justify-end w-full items-center">
        <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700">
          Contact
        </button>
      </div>
    </div>
  );
}
