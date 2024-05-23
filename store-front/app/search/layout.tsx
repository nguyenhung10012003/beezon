'use client';
import Nav from "@/components/Nav";
import SearchLayout from "@/components/SearchLayout";
import SearchBox from "@/components/SearchBox";

export default function Layout({children}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Nav/>
      <SearchBox/>
      <SearchLayout>{children}</SearchLayout>
    </>
  )
}