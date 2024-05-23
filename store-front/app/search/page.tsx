"use client";

import ProductSearch from "@/app/search/@product/page";
import SellerSearch from "@/app/search/@seller/page";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const queries = useSearchParams();
  const type = queries.get("type");

  return (
    <>
      {queries.size === 0 && (
        <>
          <ProductSearch />
          <SellerSearch />
        </>
      )}
      {(type === "all" || type === "products") && <ProductSearch />}
      {(type === "all" || type === "suppliers") && <SellerSearch />}
    </>
  );
}
