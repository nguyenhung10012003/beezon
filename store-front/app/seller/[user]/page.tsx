"use client";
import SellerProducts from "./@products/page";
import SellerProfile from "./@user/page";

export default function Seller({
  params,
}: {
  params: {
    user: string;
  };
}) {
  return (
    <>
      <SellerProfile params={params} />
      <SellerProducts params={params} />
    </>
  )
}
