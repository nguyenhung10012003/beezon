'use client';
import api from "@/config/api";
import useSWR from "swr";
import Nav from "@/components/nav";
import {useAuth} from "@/hooks/auth-context";
import {useState} from "react";
import QuantityChoice from "@/components/quantityChoice";

const fetcher = (url: string) => api.get(url).then((res: any) => res.data);
export default function ProductDetail({params}: {
  params: { id: string }
}) {
  const {data, error, isLoading} = useSWR(`product/${params.id}`, fetcher);
  const {user} = useAuth();
  const [selected, setSelected] = useState(100);
  const choices = [100, 200, 500, 1000];
  const handleAddToCart = async () => {
    try {
      await api.patch(`/cart/user/${user.id}/add`, {
        id: params.id,
        quantity: selected
      });
    } catch (e) {
      console.log(e);
    }
  }
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Nav></Nav>
      <div className="bg-white lg:px-10 lg:m-5">
        <div className="pt-6 flex flex-row">
          {/* Image gallery */}
          <div className="mx-auto mt-6 sm:px-6 flex-1 lg:max-w-7xl lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={data.image}
                alt={"hhhh"}
                className="w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div
            className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 flex-1 lg:max-w-7xl lg:grid-cols-3 flex flex-col lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{`$ ${data.price}`}</p>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{data.description}</p>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{data.detail}</p>
                </div>
              </div>
              <div>
                <QuantityChoice choices={choices} selected={selected} setSelected={setSelected}/>
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={handleAddToCart}
                className="mt-10 flex w-full items-center justify-center rounded-md
                border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium
                text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
                focus:ring-offset-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}